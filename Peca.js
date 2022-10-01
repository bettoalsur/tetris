class Peca {
  
    constructor() {
      
      let pecas = [
        [5,9,10,11],
        [6,8,9,10],
        [5,6,9,10],
        [6,9,10,11],
        [8,9,5,6],
        [5,6,10,11],
        [8,9,10,11]
      ];
      
      let num = floor(random(pecas.length));
      
      this.x = 3*w;
      this.y = 0*w;
      this.hu = 50*num;
      this.th = 0;
      this.ind = pecas[num];
    }
    
    getXYs() {
      
      let xs = [];
      let ys = [];
      
      for (let id of this.ind){
        let i = id%4;
        let j = floor(id/4);
        let x = i*w + w/2;
        let y = j*w + w/2;
  
        let xp =   (x-2*w)*cos(this.th) + 
                   (y-2*w)*sin(this.th) + 2*w;
        let yp = - (x-2*w)*sin(this.th) + 
                   (y-2*w)*cos(this.th) + 2*w;
  
        xs.push( xp+=this.x );
        ys.push( yp+=this.y );
      }
      return { xs: xs , ys: ys };
    }
    
    show() {
    
      stroke(0,0,0);
      strokeWeight(1);
      fill(this.hu,255,255);
      
      let xAll = this.getXYs().xs;
      let yAll = this.getXYs().ys;
      
      for (let i = 0; i < xAll.length ; i++){
        rect(xAll[i],yAll[i],w,w);
      }
      
    }
  
    contactLeft () {
      
      let xs = this.getXYs().xs;
      let ys = this.getXYs().ys;
      
      if (min(xs) < w) return true;
      
      let reducedIds = bloco.ids.filter( id => id!=null);
      if( reducedIds.length == 0) return false;
      
      for (let k = 0 ; k < xs.length ; k++ ){
        let i = floor( xs[k] / w );
        let j = floor( ys[k] / w );
        let index = i + j*N;
        
        if (bloco.ids[index-1] != null ) return true; 
      }
      return false;
    }
    
    contactRight () {
      
      let xs = this.getXYs().xs;
      let ys = this.getXYs().ys;
      
      if (max(xs) > width - w) return true;
      
      let reducedIds = bloco.ids.filter( id => id!=null);
      if( reducedIds.length == 0) return false;
      
      for (let k = 0 ; k < xs.length ; k++ ){
        let i = floor( xs[k] / w );
        let j = floor( ys[k] / w );
        let index = i + j*N;
        
        if (bloco.ids[index+1] != null ) return true; 
      }
      return false;
    }
    
    contactBottom () {
      
      let xs = this.getXYs().xs;
      let ys = this.getXYs().ys;
      
      if (max(ys) > height - w) return true;
      
      let reducedIds = bloco.ids.filter( id => id!=null);
      if( reducedIds.length == 0) return false;
      
      for (let k = 0 ; k < xs.length ; k++ ){
        let i = floor( xs[k] / w );
        let j = floor( ys[k] / w );
        let index = i + j*N;
        
        if (bloco.ids[index+N] != null ) return true; 
      }
      return false;
    }
    
    turn(){
      this.th-=PI/2;
    }
}