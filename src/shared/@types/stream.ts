export type TWebSocketMessage = {
	TYPE: string;
	M: string;
	FSYM: string;
	TSYM: string;
	SIDE: number;
	ACTION: number;
	CCSEQ: number;
	P: number;
	Q: number;
	SEQ: number;
	REPORTEDNS: any;
	DELAYNS: number;
};

export type TBid = { P: number; Q: number };
export type TAsk = { P: number; Q: number };

export type TSnapshot = Omit<
	TWebSocketMessage,
	'SIDE' | 'ACTION' | 'P' | 'Q' | 'SEQ' | 'REPORTEDNS' | 'DELAYNS'
> & {
	BID: TBid[];
	ASK: TAsk[];
};
