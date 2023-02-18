const decimalPlaces = 3;

export default class CorrelationCoefficient{

    constructor(xdata, ydata){
        this.xdata = xdata;
        this.ydata = ydata;
    }

    getCorrelationCoefficient(){

        // console.log(this.xdata);
    
        if(this.xdata.length === this.ydata.length){
            
            let sumX = 0;
            let sumY = 0;
            let meanX =0;
            let meanY = 0;
    
            for(let i = 0; i < this.xdata.length; i++){
                sumX += parseFloat(this.xdata[i]);
                sumY += parseFloat(this.ydata[i]);
                // console.log(parseFloat(this.xdata[i]));
            }
    
            meanX = sumX/this.xdata.length;
            meanY = sumY/this.xdata.length;
            console.log(sumX);
    
            let sumXMSq = 0;
            let sumYMSq =0;
            let sumXY = 0;
    
            for(let i = 0; i < this.xdata.length; i++){
                const xM = parseFloat(this.xdata[i]) - meanX;
                const yM = parseFloat(this.ydata[i]) - meanY;
    
                const xMSq = xM**2;
                const yMSq = yM**2;
    
                sumXMSq += xMSq;
                sumYMSq += yMSq;
    
                const xy = xM * yM;
    
                sumXY += xy;
            }
    
            const sqrtXY = Math.sqrt(sumXMSq * sumYMSq);
    
            const correlation = sumXY / sqrtXY;
    
            return correlation.toFixed(decimalPlaces);
    
        } else {
            return "error";
        }
    }

}

