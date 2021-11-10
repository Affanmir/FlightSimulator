"use strict";
let gl, canvas;  // WebGL "context"

//vertices
let vPosition;
let vertices = [];


//The model view matrix
let ObjectViewMatrix;
let ObjectViewMat;
//The projection matrix
let projMat;
let projMatx;

//Vectors to construct camera
let up_vec;
let at_vec;
let eye_vec;

//Normalized at vec
let N_at_vec 



let speed_val = 1;
let render_mode = 1;
let render_mode_string = "Wireframe";

//Slider variable for flat shading interpolation
let InterpolateFactor = 0.5;
let InterpolateLoc;


//Number of intervals in our plane
let detail_level = 0.1;

//Frustum
let left_c = -1;
let right_c = 1;
let bottom_c = -1;
let top_c = 1;
let near_c = 1;
let far_c = -1;


let shade_mode = 2;
let shade_mode_string = "Flat";


function buffer_setup(){
    
    
    canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.52, 0.8, 0.9, 1.0 );
    let program;
    //  Load shaders and initialize attribute buffers


    if(shade_mode ==0){
            program = initShaders( gl, "vertex-shader-smooth", "fragment-shader-smooth" );
            shade_mode_string = "Smooth";
        }

    else if(shade_mode ==1){
        program = initShaders( gl, "vertex-shader-phong", "fragment-shader-phong" );
        shade_mode_string = "Phong";
        }
   
    else{
        program = initShaders( gl, "vertex-shader-flat", "fragment-shader-flat" );
        shade_mode_string = "Flat";
        }
   
    gl.useProgram( program );


    ObjectViewMatrix = flatten(lookAt(eye_vec, at_vec, up_vec ));
    ObjectViewMat = gl.getUniformLocation( program, "viewmatrix" );

    projMat = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
    projMatx = gl.getUniformLocation( program, "projmatrix" );


    InterpolateLoc = gl.getUniformLocation( program, "interpolate" );
    document.getElementById("Look_At_Vector").innerHTML = "Look at vector : "+"<"+String (Math.round(N_at_vec[0]* 100) / 100 ) +", " +String(Math.round(N_at_vec[1]* 100) / 100 ) + ", "+String(Math.round(N_at_vec[2]* 100) / 100 ) +">";
    document.getElementById("Eye_Vector").innerHTML = "Eye vector : "+"<"+String(Math.round(eye_vec[0]* 100) / 100 ) +", " +String(Math.round(eye_vec[1]* 100) / 100 ) + ", "+String(Math.round(eye_vec[2]* 100) / 100 )  +">";
    document.getElementById("Speed").innerHTML = "Speed : "+ String(speed_val);
    document.getElementById("Shading_Mode").innerHTML = "Shading Mode : "+ shade_mode_string;
    document.getElementById("Render_Mode").innerHTML = "Render Mode : "+ render_mode_string;


    document.getElementById("myRange").oninput = function() {
	InterpolateFactor = this.value;

	requestAnimationFrame(render);
    }

    
    
    gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices) ,gl.STATIC_DRAW );
  
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
}


window.onload = function init()
{

    
    //Initial camera cordinates
    up_vec = vec3(0.0,1.0,0.0);
    at_vec = vec3(0.0, 0.0, -1.0 );
    eye_vec =  vec3(0.0,1 ,4 );

    
    N_at_vec = vec3(0.0, 0.0, -1.0 );

    //Initial vertice cordinates
    vertices = getpatch(eye_vec[0] -5,eye_vec[0] + 5, eye_vec[2]-5, eye_vec[2]+ 5);


    //Changing our eye vector
    // And making necessary changes to modelviewmatrix

    const loop = setInterval( (()=> {
        let length = ((at_vec[0])**2 + (at_vec[1])**2 + (at_vec[2])**2)**(1/2);
        N_at_vec = vec3(at_vec[0]/length, at_vec[1]/length, at_vec[2]/length);     
        at_vec = vec3( at_vec[0] + N_at_vec[0]*0.01*speed_val , at_vec[1],  at_vec[2] + N_at_vec[2]*0.01*speed_val );  
        
        if(at_vec[1] != 0){
            if (eye_vec[1] >=0 && eye_vec[1]<=2){

                 eye_vec[1] = eye_vec[1]+0.01*at_vec[1];}
            if (eye_vec[1] >=2 && at_vec[1]<=0){
                eye_vec[1] = eye_vec[1]+0.01*at_vec[1];}

                if (eye_vec[1] <=0 && at_vec[1]>=0){
                    eye_vec[1] = eye_vec[1]+0.01*at_vec[1];}


            }
        
        
        
        eye_vec = vec3( eye_vec[0] + 0.01*N_at_vec[0]*speed_val , eye_vec[1],  eye_vec[2] + 0.01*N_at_vec[2]*speed_val ); 
        ObjectViewMatrix = flatten(lookAt(eye_vec ,at_vec, up_vec ));
        requestAnimationFrame(render);
        
        buffer_setup();   

        }) , 100)    

    
    //Setup the buffer
    buffer_setup(); 
    //reder
    render();
    //handle events
    handle_event();  

   
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniformMatrix4fv(projMatx,false, projMat);
    gl.uniformMatrix4fv(ObjectViewMat,false, ObjectViewMatrix);
    gl.uniform1f(InterpolateLoc, InterpolateFactor);

    if(render_mode == 0) { 
        gl.drawArrays( gl.POINTS, 0, vertices.length );
        render_mode_string = "Points";
    }
   
    if(render_mode == 1){

        for(let i=0 ; i<vertices.length; i+=606){
            gl.drawArrays( gl.LINE_STRIP, i, i+606 );
             }
        
        render_mode_string = "Wireframe";

    }


    if(render_mode == 2){ 
        gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
        render_mode_string = "Triangles";
    
    }

}
