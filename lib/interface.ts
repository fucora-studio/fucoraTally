export interface Assessment {
    name: string;
    weight: number;
}

export interface UNSWAssessment {
    integrat_title: string;
    integrat_weight: string;
}

export interface UNSWData {
    integrat_CO_Assessment: UNSWAssessment[];
}
