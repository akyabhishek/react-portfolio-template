export interface ProfileResponse {
  username: string;
  name: string;
  birthday: string;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string;
  twitter: string;
  linkedIN: string;
  website: string[];
  country: string;
  company: string;
  school: string;
  skillTags: string[];
  about: string;
}

export interface SolvedProblemsResponse {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
  acSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
}
