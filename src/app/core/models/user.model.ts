
export class User {
    public userName: string;
    public apiKey: string;
    public serverCalls: number;
    public cacheExpiryDateTime: Date;

    public constructor(user?: User) {
        if (!user) {
            return;
        }
        this.userName = user.userName;
        this.apiKey = user.apiKey;
        this.serverCalls = user.serverCalls;
        
        if (user.cacheExpiryDateTime) {
            this.cacheExpiryDateTime = new Date(user.cacheExpiryDateTime);
        }

    }
}