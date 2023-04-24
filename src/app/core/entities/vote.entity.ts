export interface Vote {
  id?: number;
  questionID: number;
  response: boolean;
  user: string;
}
