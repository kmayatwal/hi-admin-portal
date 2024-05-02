export class VitalBloodPressureRules {
    bp: 'systolic' | 'diastoloc';
    constructor(bp: 'systolic' | 'diastoloc') {
        this.bp = bp
    }
    private get rule() {
        return {
            systolic: {
                normal: { lt: 120 },
                risk: { gte: 120, lte: 139, },
                emergency: { gte: 140 },
            },
            diastoloc: {
                normal: { lt: 80 },
                risk: { gte: 80, lte: 89, },
                emergency: { gte: 90 },
            },
        }
    }

    isNormal(value) {
        const { normal } = this.rule[this.bp];
        if (normal) {
            if (value < normal.lt) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule[this.bp];
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(value: number) {
        const { emergency } = this.rule[this.bp];
        if (emergency) {
            if (value >= emergency.gte) return true;
        }
        return false;
    }

}

export class VitalBloodOxygenRules {

    private get rule() {
        return {
            normal: { gte: 98, lte: 100, },
            risk: { gte: 90, lte: 97, },
            emergency: { lt: 90 },
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule;
        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule;
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(value: number) {
        const { emergency } = this.rule;
        if (emergency) {
            if (value < emergency.lt) return true;
        }
        return false;
    }

}

export class VitalBloodSugerRules {

    mealPreference: string;
    constructor(mealPreference: string) {
        this.mealPreference = mealPreference.toLowerCase()
    }
    private get rule() {
        return {
            'while fasting': {
                normal: { gte: 70, lte: 99, },
                risk: { gte: 100, lte: 125, },
                emergency: { gte: 126, },
            },
            general: {
                normal: { gte: 0, lte: 199, },
                risk: 'NA',
                emergency: { gte: 200, },
            },
            'not set': {
                normal: { gte: 0, lte: 199, },
                risk: 'NA',
                emergency: { gte: 200, },
            },
            "after a meal": {
                normal: { gte: 120, lte: 140, },
                risk: { gte: 141, lte: 199, },
                emergency: { gte: 200 },
            },
            "before a meal": {
                normal: { gte: 70, lte: 99, },
                risk: { gte: 100, lte: 125, },
                emergency: { gte: 126, },
            }
        }
    }

    isNormal(value: number) {
        this.mealPreference = this.mealPreference.toLowerCase();
        const { normal } = this.rule[this.mealPreference];

        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        if (this.mealPreference === 'random') return false;
        const { risk } = this.rule[this.mealPreference];
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(value: number) {
        const { emergency } = this.rule[this.mealPreference];
        if (emergency) {
            if (value >= emergency.gte) return true;
        }
        return false;
    }

}

export class VitalBloodSugerHbA1CRules {

    private get rule() {
        return {
            normal: { gte: 4, lte: 5.6, },
            risk: { gte: 5.6, lte: 6.4, },
            emergency: 'N/A',
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule;

        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule;
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(_value: number) {
        return true;
    }

}

export class VitalPulseRules {
    age: number;
    constructor(age: number) {
        this.age = age
    }
    private get rule() {
        return {
            age: [
                {
                    min: 0, max: 0.33,
                    normal: { gte: 90, lte: 150, },
                    risk: [{ gte: 61, lte: 89, }, { gte: 151, lte: 199, }],
                    emergency: { lte: 60, gte: 200, },
                },
                {
                    min: 0.5, max: 5,
                    normal: { gte: 80, lte: 140, },
                    risk: [{ gte: 61, lte: 79, }, { gte: 141, lte: 179, },],
                    emergency: { lte: 60, gte: 180, },
                },
                {
                    min: 6, max: 10,
                    normal: { gte: 70, lte: 100, },
                    risk: [{ gte: 61, lte: 69, }, { gte: 101, lte: 159, },],
                    emergency: { lte: 60, gte: 160, },
                },
                {
                    min: 11, max: 14,
                    normal: { gte: 60, lte: 105, },
                    risk: [{ gte: 51, lte: 59, }, { gte: 106, lte: 118, },],
                    emergency: { lte: 50, gte: 119, },
                },
                {
                    min: 15, max: 150,
                    normal: { gte: 60, lte: 85, },
                    risk: [{ gte: 51, lte: 59, }, { gte: 86, lte: 99, },],
                    emergency: { lte: 50, gte: 100 },
                }
            ]
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (risk) {
            return risk.some(itm => value >= itm.gte && value <= itm.lte)
        }
        return false;
    }

    isEmergency(value: number) {
        const { emergency } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (emergency) {
            if (value <= emergency.lte || value >= emergency.gte) return true;
        }
        return false;
    }
}

export class VitalTempratureRules {
    age: number;
    constructor(age: number) {
        this.age = age
    }

    private get rule() {
        return {
            age: [
                {
                    min: 0, max: 2,
                    normal: { min: 97.88, max: 99.14, },
                },
                {
                    min: 3, max: 10,
                    normal: { min: 95.9, max: 99.5, },
                },
                {
                    min: 11, max: 65,
                    normal: { min: 97, max: 99.68, },
                },
                {
                    min: 66, max: 150,
                    normal: { min: 96.44, max: 98.4, },
                }
            ]
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (normal) {
            if (value >= normal.min && value <= normal.max) return true;
        }
        return false;
    }

    isRisk(value: number) {
        return false;// TODO
    }

    isEmergency(value: number) {
        return !this.isNormal(value);
    }
}

export class VitalRespiratoryRateRules {
    age: number;
    constructor(age: number) {
        this.age = age
    }
    private get rule() {
        return {
            age: [
                {
                    min: -5, max: -1,
                    normal: { gte: 50, lte: 60, },
                    risk: [{ min: 40, lt: 50, }, { min: 60, lt: 65, },],
                    emergency: { gt: 65, lt: 40, },
                },
                {
                    min: 0, max: 1,
                    normal: { gte: 30, lte: 50, },
                    risk: [{ gt: 25, lt: 30, }, { gt: 50, lt: 55, },],
                    emergency: { gt: 55, lt: 25, },
                },
                {
                    min: 2, max: 3,
                    normal: { gte: 24, lte: 40, },
                    risk: [{ gt: 20, lt: 24, }, { gt: 40, lt: 45, },],
                    emergency: { gt: 45, lt: 20, },
                },
                {
                    min: 4, max: 6,
                    normal: { gte: 22, lte: 34, },
                    risk: [{ gt: 15, lt: 20, }, { gt: 34, lt: 40, },],
                    emergency: { gt: 40, lt: 15, },
                },
                {
                    min: 7, max: 12,
                    normal: { gte: 18, lte: 30, },
                    risk: [{ gt: 15, lt: 17, }, { gt: 31, lt: 35, },],
                    emergency: { gt: 35, lt: 15, },
                },
                {
                    min: 13, max: 150,
                    normal: { gte: 12, lte: 16, },
                    risk: [{ gt: 8, lt: 12, }, { gt: 16, lt: 27, },],
                    emergency: { gt: 27, lt: 8, },
                }
            ]
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (risk) {
            return risk.some(itm => value > itm.gt && value < itm.lt)
        }
        return false;
    }

    isEmergency(value: number) {
        const { emergency } = this.rule.age.find(itm => this.age >= itm.min && this.age <= itm.max);
        if (emergency) {

            if (value > emergency.gt) return true;
            if (value < emergency.lt) return true
        }
        return false;
    }
}

export class VitalFahrenheitTempratureRules {

    private get rule() {
        return {
            normal: { gte: 95, lte: 99.5, },
            risk: { gte: 99.51, lte: 100.9, },
            emergency: 'N/A',
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule;

        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule;
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(_value: number) {
        return true;
    }

}

export class VitalCelsiusTempratureRules {

    private get rule() {
        return {
            normal: { gte: 35.9, lte: 37.2, },
            risk: [{ gte: 35.1, lte: 35.88, }, { gte: 37.3, lte: 38, }],
            emergency: 'N/A',
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule;

        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule;
        if (risk) {
            if ((value >= risk[0].gte && value <= risk[0].lte) || (value >= risk[1].gte && value <= risk[1].lte)) return true;
        }
        return false;
    }

    isEmergency(_value: number) {
        return true;
    }

}

export class VitalRespiratoryRate2Rules {

    private get rule() {
        return {
            normal: { gte: 12, lte: 16, },
            risk: [{ gte: 8, lte: 11, }, { gte: 17, lte: 27, }],
            emergency: 'N/A',
        }
    }

    isNormal(value: number) {
        const { normal } = this.rule;
        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        const { risk } = this.rule;
        if (risk) {
            if ((value >= risk[0].gte && value <= risk[0].lte) || (value >= risk[1].gte && value <= risk[1].lte)) return true;
        }
        return false;
    }

    isEmergency(_value: number) {
        return true;
    }

}

export class VitalBloodSugermgdLRules {

    mealPreference: string;
    constructor(mealPreference: string) {
        this.mealPreference = mealPreference.toLowerCase()
    }
    private get rule() {
        return {
            'random': {
                normal: 'NA',
                risk: [{ gte: 61, }, { gte: 51, lte: 60, }],
                emergency: 'N/A',
            },
            'while fasting': {
                normal: { gte: 70, lte: 99, },
                risk: { gte: 100, lte: 125, },
                emergency: 'N/A',
            },
            general: {
                normal: { gte: 0, lte: 130, },
                risk: { gte: 131, lte: 199, },
                emergency: 'N/A',
            },
            'not set': {
                normal: { gte: 70, lte: 99, },
                risk: { gte: 100, lte: 125, },
                emergency: 'N/A',
            },
            "after a meal": {
                normal: { gte: 70, lte: 140, },
                risk: { gte: 141, lte: 199, },
                emergency: 'N/A',
            },
            "before a meal": {
                normal: { gte: 70, lte: 99, },
                risk: { gte: 100, lte: 125, },
                emergency: 'N/A',
            }
        }
    }

    isNormal(value: number) {
        if (value < 70) {
            return false;
        }
        this.mealPreference = this.mealPreference.toLowerCase();
        const { normal } = this.rule[this.mealPreference];

        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        if (value < 70) {
            const { risk } = this.rule['random'];
            if ((value >= risk[0].gte) || (value >= risk[1].gte && value <= risk[1].lte)) return true;
            return false;
        }

        const { risk } = this.rule[this.mealPreference];
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(_value: number) {
        return true;
    }

}

export class VitalBloodSugermmolRules {

    mealPreference: string;
    constructor(mealPreference: string) {
        this.mealPreference = mealPreference.toLowerCase()
    }
    private get rule() {
        return {
            'random': {
                normal: 'NA',
                risk: [{ gte: 3.38, lte: 3.88, }, { gte: 2.8, lte: 3.37, }],
                emergency: 'N/A',
            },
            'while fasting': {
                normal: { gte: 3.89, lte: 5.6, },
                risk: { gte: 5.6, lte: 6.9, },
                emergency: 'N/A',
            },
            general: {
                normal: { gte: 3.89, lte: 5.6, },
                risk: { gte: 5.6, lte: 6.9, },
                emergency: 'N/A',
            },
            'not set': {
                normal: { gte: 3.89, lte: 5.6, },
                risk: { gte: 5.6, lte: 6.9, },
                emergency: 'N/A',
            },
            "after a meal": {
                normal: { gte: 6.7, lte: 7.8, },
                risk: { gte: 7.81, lte: 11, },
                emergency: 'N/A',
            },
            "before a meal": {
                normal: { gte: 3.89, lte: 5.6, },
                risk: { gte: 5.6, lte: 6.9, },
                emergency: 'N/A',
            }
        }
    }

    isNormal(value: number) {
        if (value < 3.88) {
            const { risk } = this.rule['random'];
            if ((value >= risk[0].gte && value <= risk[0].lte) || (value >= risk[1].gte && value <= risk[1].lte)) return true;
            return false;
        }

        this.mealPreference = this.mealPreference.toLowerCase();
        const { normal } = this.rule[this.mealPreference];

        if (normal) {
            if (value >= normal.gte && value <= normal.lte) return true;
        }
        return false;
    }

    isRisk(value: number) {
        if (value < 3.88) {
            const { risk } = this.rule['random'];
            if ((value >= risk[0].gte && value <= risk[0].lte) || (value >= risk[1].gte && value <= risk[1].lte)) return true;
            return false;
        }

        const { risk } = this.rule[this.mealPreference];
        if (risk) {
            if (value >= risk.gte && value <= risk.lte) return true;
        }
        return false;
    }

    isEmergency(_value: number) {
        return true;
    }

}