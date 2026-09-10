export interface Assessment {
    name: string;
    weight: number;
}

export interface UNSWAssessment {
    integrat_title: string;
    integrat_weight: string;
}

export interface UNSWData {
    integrat_coursecode: string;
    integrat_coursename: string;
    integrat_CO_Assessment: UNSWAssessment[];
}

export interface error {
    error: boolean;
    message: string;
}

export interface ReturnData {
  code: string;
  courseName: string;
  assessment: Assessment[];
}
