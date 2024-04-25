
import { Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { onError } from "@apollo/client/link/error";
import { ApolloLink } from "@apollo/client/link/core";
import { HttpLink } from 'apollo-angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import {
    getBaseURL, getIMURL
} from 'src/app/graphql.module';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HiInternetOfflineComponent } from '../hi-internet-offline/hi-internet-offline.component';

@Injectable({
    providedIn: 'root'
})
export class GraphqlService {

    onlineEvent: Observable<Event>;
    offlineEvent: Observable<Event>;

    subscriptions: Subscription[] = [];

    connectionStatusMessage: string;
    connectionStatus: string;

    constructor(
        private apollo: Apollo,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private httpLink: HttpLink,
        private modalService: NgbModal
    ) {
        this.onlineEvent = fromEvent(window, 'online');
        this.offlineEvent = fromEvent(window, 'offline');

        this.subscriptions.push(this.onlineEvent.subscribe(e => {
            this.connectionStatusMessage = 'Back to online';
            this.connectionStatus = 'online';
            console.log('Online...');
            this.modalService.dismissAll();
        }));

        this.subscriptions.push(this.offlineEvent.subscribe(e => {
            this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
            this.connectionStatus = 'offline';
            console.log('Offline...');
            this.openInternetOffline();
        }));
    }

    public getGraphqlData({
        definition,
        showLoader,
        iamURL
    }: { definition: any, showLoader?: boolean, iamURL?: boolean }) {
        showLoader = typeof showLoader !== "boolean" || showLoader;
        if (showLoader) this.spinner.show();
        return new Promise((resolve, reject) => {
            this.processQuery(definition, resolve, reject, iamURL);
        });
    }

    public suscribeGraphqlData({
        definition,
        onSuccess,
        showLoader,
        reject
    }: { definition: any, onSuccess: Function, reject?: Function, showLoader?: boolean }) {
        showLoader = typeof showLoader !== "boolean" || showLoader;
        if (showLoader) this.spinner.show();
        this.processSubscriptionQuery(definition, onSuccess, reject);
    }

    private onGQLError(reject: Function) {
        return onError(({ graphQLErrors, networkError }) => {
            this.spinner.hide();
            if (graphQLErrors) {
                this.toastr.error(graphQLErrors[0].message);
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
                reject(graphQLErrors[0].message);
            }

            if (networkError) {
                this.toastr.error(networkError.message);
                console.log(`[Network error]: ${networkError}`);
                reject(networkError.message);
            }

        });
    }

    private processSubscriptionQuery(definition: any, resolve: Function, reject?: Function) {
        const httpLink = this.httpLink.create({
            uri: getBaseURL(),
        });
        const link = ApolloLink.from([this.onGQLError(reject), httpLink]);

        this.apollo.removeClient();
        this.apollo.create({
            cache: new InMemoryCache({ addTypename: false }),
            link: link
        });

        const onResult = (result: any) => {
            resolve(result);
            this.spinner.hide();
        }

        this.apollo.subscribe({
            ...definition,
        }).subscribe((result: any) => {
            onResult(result);
        }, (error) => {
            if (reject) reject(error);
        });
    }

    private processQuery(definition: any, resolve: Function, reject: Function, iamURL: Boolean) {
        const httpLink = this.httpLink.create({
            uri: iamURL ? getIMURL() : getBaseURL(),
        });
        const link = ApolloLink.from([this.onGQLError(reject), httpLink]);

        this.apollo.removeClient();
        this.apollo.create({
            cache: new InMemoryCache({ addTypename: false }),
            link: link
        });

        const onResult = (result: any) => {
            resolve(result);
            this.spinner.hide();
        }

        if (this.connectionStatus !== 'offline') {
            if (definition.mutation) {
                this.apollo
                    .mutate({
                        ...definition,
                    })
                    .subscribe((result: any) => {
                        onResult(result);
                    });
            } else if (definition.query) {
                this.apollo
                    .watchQuery({
                        ...definition,
                    }).valueChanges.subscribe((result: any) => {
                        onResult(result);
                    });
            }
        } else {
            this.toastr.error('Internet Connection is Not Present');
            this.spinner.hide();
        }

    }

    openInternetOffline() {
        const modalRef = this.modalService.open(HiInternetOfflineComponent, { centered: true, backdrop: 'static', keyboard: false, size: 'xl' });
        modalRef.componentInstance.data = this;
        modalRef.result.then((result) => {
            if (result != 'close') {
            }
        }, (reason) => {
        });
    }
}