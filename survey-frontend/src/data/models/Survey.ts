export interface Survey {
	id: number;
	name: string;
  questions?:SurveyQuestion[];

}


export interface SurveyQuestion {
	id: number;
	name: string;
  options?:SurveyOption[];
}

export interface SurveyOption {
	id: number;
	name: string;
}
