class Bloco {
  
    constructor () {
      this.cor = new Array(M*N).fill(null) ;
      this.ids = new Array(M*N).fill(null) ;
    }
    
    addPeca(peca) {
      
      let xs = peca.getXYs().xs;
      let ys = peca.getXYs().ys;
      
      for (let k = 0 ; k < xs.length ; k++ ){
        
        let i = floor( xs[k] / w );
        let j = floor( ys[k] / w );
        let index = i + j*N;
        
        this.cor[index] = peca.hu;
        this.ids[index] = index;
      }
    }
    
    show () {
      
      let reducedIds = this.ids.filter( id => id!=null);
      if( reducedIds.length == 0) return;
      
      stroke(0,0,0);
      strokeWeight(1);
      
      for(let id of reducedIds) {
        let xp = ( id%N )*w + w/2;
        let yp = floor( id/N )*w + w/2;
        
        fill(this.cor[id],255,255);
        rect(xp,yp,w,w);
      }
    }
    
    checkFilledRows() {
      
      for (let row = M-1 ; row >= 0 ; row--) {
        
        let cont = 0;
        
        for (let i = 0 ; i < N ; i ++) {
          let index = i + row*N;
          if (this.ids[index] != null) cont++;
        }
        
        if (cont == 0) return;
        if (cont == N) {
          this.exclude(row);
          return;
        }
      }
    }
    
    exclude(row){
            
      let index = row*N;
      this.ids.splice(index,N);
      this.cor.splice(index,N);
      
      for (let ind = index-1 ; ind >= 0 ; ind--) {
        if ( this.ids[ind] != null ) {
          this.ids[ind] += N;
        }
      }
      
      for (let i = 0 ; i < N ; i++) {
        this.cor.unshift(null);
        this.ids.unshift(null);
      }
    }
    
} // class ends
  