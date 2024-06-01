export interface Person {
	id: string;
	name: string;
	linkedinUrl: string;
	lnusername: string;
	email: string;
}

export interface Company {
	id: string;
	name: string;
	linkedinUrl: string;
	website: string;
	lnusername: string;
}

export type Item = Person | Company;
