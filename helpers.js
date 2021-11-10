function mappoint(P, Q , A ,B ,X ) 
{
    if( P.type != Q.type || A.type != B.type ){
        throw "mappoint: trying to interpolate incosistent types";
    }

    let alpha;
    let var1 = subtract( X, P);
    let var2 = subtract( Q, P);

    //FOLLOWING THE FORMULA GIVEN TO US IN THE LATEX
    alpha = length(var1)/length(var2);
    
    let out = mix( A, B, alpha );
    return out


}

//The function generates a 2D mesh, the height is calculated inside the GPU
//We define detail level as a global variable which is the number of intervals on our plane
function getpatch(xmin, xmax, zmin, zmax){

    let vertix = []
    for( let i = xmin ; i< xmax  ; i+= detail_level){
        for (let j = zmin ; j< zmax ; j+=detail_level){

            //Add 6 vertices in a order to make a wireframe complete
            vertix.push( vec2(i, j ));
            vertix.push (vec2( i , j +detail_level));
            vertix.push (vec2( i + detail_level, j +detail_level));
            vertix.push (vec2( i + detail_level, j ));
            vertix.push( vec2(i, j ));
            vertix.push (vec2( i + detail_level, j +detail_level));
            
        
           
        }
        
    } 

    return vertix;

}

