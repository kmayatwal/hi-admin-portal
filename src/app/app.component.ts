import { Component, Injectable, inject } from '@angular/core';
import {
	Event,
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router,
} from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UtilityService } from './_services/utility.service';
import { StateService } from './stateService';
// import { Messaging, onMessage, getMessaging, deleteToken } from '@angular/fire/messaging';
// import { KeycloakService } from './keycloak.service';
// import { BeforeLoginApis } from 'src/app/basicLoginCalls';
import { environment } from 'src/environments/environment';
// import { Client, API_REGIONS } from '@amityco/ts-sdk';
// const client = Client.createClient('b0e9e00868dfa4374c358f1f070f458ad15a8db1bf616e78', API_REGIONS.SG)

@Injectable({
	providedIn: 'root'
})
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	// private readonly _messaging = inject(Messaging);
	title = 'Helath Interface Admin Portal';
	showChatBox: boolean = false;
	showChatBoxTooltip: boolean = false;
	showTyping: boolean = false;
	messageText: string = '';
	appointmentId: string = '';
	userData: any;

	showIncomingCall: boolean = false;
	private audio: HTMLAudioElement;
	private isPlaying: boolean = false;
	private callType: string = '';

	hideSideMenu: boolean = false;

	// messaging = getMessaging();


	chatBoxChats = [
		{
			userType: 'HI_DOC',
			message: 'Hello, I\'m Hi Doc, the virtual AI assistant from Health Interface. I\'m here to help you with any medical inquiries you may have. Feel free to ask me questions by typing them out. Give me a try today!',
			timetoken: new Date()
		}
	];

	constructor(
		private router: Router,
		private apiService: ApiService,
		private utilityService: UtilityService,
		private stateService: StateService,
		// private beforeLoginApis: BeforeLoginApis,
		// private keycloakService: KeycloakService,
	) {
		console.log('this is Angular 14 with Upgrade');

		this.router.events.subscribe((event: Event) => {
			switch (true) {
				case event instanceof NavigationStart: {
					break;
				}
				case event instanceof NavigationEnd:
				case event instanceof NavigationCancel:
				case event instanceof NavigationError: {
					break;
				}
				default: {
					break;
				}
			}
		});
	}

	ngOnInit(): void {

		// Check if User is Logged in, if Yes then go to Dashbord, if No then go to Login Page

		// this.keycloakService.init(`${window.location.pathname}${window.location.search}`)
		// 	.then(async (authenticated) => {
		// 		if (authenticated) {
		// 			console.log('User is authenticated');
		// 			// this.toastr.success('Login Successfully', 'Success');
		// 			this.beforeLoginApis?.getUserInfo();
		// 		} else {
		// 			console.log('User is not authenticated');
		// 			const unAuthRoute = ['/pricing', '/doctor', '/contactus', '/about-us', '/termsofuse', '/termsofuse/privacypolicy', '/blogs', '/blog'];
		// 			if (unAuthRoute.some(route => window.location.pathname.startsWith(route))) {
		// 				this.router.navigate([window.location.pathname]);
		// 			} else {
		// 				this.router.navigate(['/']);
		// 			}
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error('Keycloak initialization error:', error);
		// 	});
	}

	get isHiDocEnabled() {
		return this.utilityService?.getUserPermission()?.aiToolsEnabled;
	}

	userIsLogged() {
		if (localStorage.getItem('currentUser') != null || this.router.url == '/charts') {
			return true;
		}
		return false;
	}

	openChatBox() {
		this.showChatBox = !this.showChatBox;
		this.showChatBoxTooltip = false;
	}

	closeChatBoxTooltip() {
		this.showChatBoxTooltip = false;
	}

	sendMessage() {
		if (this.messageText === '')
			return;

		let textSendObject = {
			message: this.messageText,
			maxToken: 250
		}

		this.chatBoxChats.push({
			userType: 'user',
			message: this.messageText,
			timetoken: new Date()
		});
		setTimeout(() => {
			var myElement = document.getElementById('chatbotMessages');
			myElement.scrollTop = myElement.scrollHeight + 200;
		}, 200);
		this.showTyping = true;
		this.apiService.sendMessage(textSendObject).subscribe((data: any) => {
			setTimeout(() => {
				this.chatBoxChats.push({
					userType: 'HI_DOC',
					message: data.response,
					timetoken: new Date(),
				});
				this.showTyping = false;
				setTimeout(() => {
					var myElement = document.getElementById('chatbotMessages');
					myElement.scrollTop = myElement.scrollHeight + 200;
				}, 200);
			}, 250);
		}, error => {
			this.showTyping = false;
		});
		this.messageText = '';
	}

	getAvatar(userData, bgColorCode) {
		return `https://ui-avatars.com/api/?name=${userData?.firstName}+${userData?.lastName}&background=${bgColorCode}&color=66676B`;
	}

	ngAfterViewInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const currentRoute = event.urlAfterRedirects;
				console.log('this is currentRoute', currentRoute);
				this.hideSideMenu = currentRoute.includes('/remote-monitorin-subscription-plan') ? true : false;
			}
		});
	}

}
