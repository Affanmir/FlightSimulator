function handle_event(){
    window.addEventListener("keydown", event => {


        if (event.key == "q" || event.key == "Q") { // chaning the upvector's x direction positive

            if (up_vec[0]<=2){ //sETTING LIMIT

                up_vec = vec3( up_vec[0]+0.1, up_vec[1] , up_vec[2]);}
                ObjectViewMatrix = flatten(lookAt( eye_vec,at_vec, up_vec ));

            }

 

        if (event.key == "e" || event.key == "E") { // chaning the upvector's x direction negative

            if (up_vec[0]>=-2){ //Setting limit

                up_vec = vec3( up_vec[0]-0.1, up_vec[1] , up_vec[2]); 
                ObjectViewMatrix = flatten(lookAt(eye_vec ,at_vec, up_vec ));
                
            }

            }

 

        if (event.key == "w" || event.key == "W") { // changing look_at vec's y direction  positive

            if (at_vec[1]<=2){ // Seeting limit

                at_vec = vec3( at_vec[0], at_vec[1]+0.1 , at_vec[2]);
                ObjectViewMatrix = flatten(lookAt( eye_vec, at_vec, up_vec ));

                }
            }
        

        //All comments can be generalized for the code below
      

        if (event.key == "s" || event.key == "S") {

            if (at_vec[1]>=-2 ){

                at_vec = vec3( at_vec[0], at_vec[1] -0.1, at_vec[2] );
                ObjectViewMatrix = flatten(lookAt(eye_vec ,at_vec, up_vec ));

                }
            }

 

        if (event.key == "d" || event.key == "D") {

            if (at_vec[0]<=1 ){

                at_vec = vec3( at_vec[0]+0.1, at_vec[1], at_vec[2]); 
                ObjectViewMatrix = flatten(lookAt(eye_vec ,at_vec, up_vec ));
                }   

            }

 

        if (event.key == "a" || event.key == "A") {

            if (at_vec[0]>=-2 ){

                at_vec = vec3( at_vec[0]-0.1, at_vec[1], at_vec[2] ); 
                ObjectViewMatrix = flatten(lookAt(eye_vec ,at_vec, up_vec ));
                }

            }

        if (event.key == "v" || event.key == "V") {

            render_mode++;
            render_mode=render_mode%3;

        }

 

        if (event.key == "Escape") window.close();

        //Changing shade mode
        if (event.key == "c" || event.key == "C") {

            shade_mode++;
            shade_mode=shade_mode%3;
            
        }


        //Implemnting Shift+1 by mapping it onto "!" key and follows
        if (event.key == "!"){
            
            if (left_c > -2){
                left_c -= 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "@"){
            if (right_c < 2){

                right_c += 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "#"){

            if (top_c < 2){

                top_c += 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "$"){
            if (bottom_c > -2){

                bottom_c -= 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "%"){

            if (near_c < 1.5){

                near_c += 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "^"){

            if (far_c > -2){

                far_c -= 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "1"){

            if (left_c < -1){

                left_c += 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));}
        }

        if (event.key == "2"){

            if (right_c > 1){

                right_c -= 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "3"){

            if (top_c > 1){
                top_c -= 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }
        if (event.key == "4"){

            if (bottom_c < -1){

                bottom_c += 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }
        if (event.key == "5"){

            if (near_c > 0.5){

                near_c -= 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.key == "6"){
            if (far_c < -1){

                far_c += 0.1;
                projMatrix = flatten(frustum(left_c, right_c, bottom_c, top_c, near_c, far_c));
            }
        }

        if (event.keyCode == '38') { //up arrow to increase speed

            if ( speed_val >=5) 
                { speed_val = 5}
            else
            {
                speed_val = speed_val + 0.5;
            }
        }
               

        if (event.keyCode == '40') { //down arrow

            if (speed_val <=0){speed_val = 0}
            else {speed_val = speed_val - 0.5;}
            

            }
        
        
      
        //Generate a new set of vertices
        // Since our plane is 10x10 units big
        //Move 2.8 units and generate a new set of vertice
        //Time = 2.8/speed hence call this function every Time secounds
        var myVar = setInterval(setpatch, 2.8/speed_val *1000);

            function setpatch() {
                vertices = getpatch(eye_vec[0] -5,eye_vec[0] + 5, eye_vec[2]-5, eye_vec[2]+ 5) 
            }

        function stopColor() {
                clearInterval(myVar);
              } 
        
        
        
        requestAnimationFrame( render );
        
              
        });
    }
