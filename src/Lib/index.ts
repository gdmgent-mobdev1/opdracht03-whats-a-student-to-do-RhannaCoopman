interface State {
  text : string, 
  description : string, 
  comments? : string[]
};

type Property = keyOf State;
export type { State };