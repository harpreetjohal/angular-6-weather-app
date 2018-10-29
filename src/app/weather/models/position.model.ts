
export class Position  {
    public latitude: string;
    public longitude: string;
   
    public constructor(position?: Position) {
        if (!position) {
            return;
        }

        this.latitude = position.latitude;
        this.longitude = position.longitude;
    }
}