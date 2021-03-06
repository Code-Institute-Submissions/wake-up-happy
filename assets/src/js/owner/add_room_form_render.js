/*RENDERING FORM TO ADD ROOM, USING SET
 room_types,board_types,views,amenities_list,room_styles
 FROM localStorage
 
 INSTEAD OF HARDCODING HTML IN owner.html, I AM RENDERING EACH FORM PART
 IN A LOOP FOR EACH OF THE  room_types,board_types,views,amenities_list,room_styles
 FROM localStorage
 
 
 IF OWNER IS EDITING ALREADY EXISTING ROOM WE WILL POPULATE FIELDS WITH HIS room VALUES*/


import {
	
	amenities_list,
	view_types,
	board_types,
	room_types,
	room_styles
	
	
} from './../shared/inventory.js';


var room = sessionStorage.room_to_edit ? JSON.parse ( sessionStorage.room_to_edit ) : null;


function render_room_types ()
	{
		
		var room_types_div   = $ ( '#room_types' );
		var owners_room_type = room ? room.room_type : '';
		
		$ ( '#room_types_title' )
			.append ( `

					<p class = "card-text p-2 show_content" data-hidden_class = "room_type_images"
					data-cy="room_type_title">
					
					 <!--IF WE HAVE OWNERS ROOM , GIVING "GREEN LIGHT" ( green circle with white check sign)-->
					<i class="fas fa-check-circle green ${ room ? '' : 'd-none' }  ___" id="room_types_title_green" data-title="Room type selected."></i>
		            <i class="fas fa-question-circle red ${ room ? 'd-none' : '' } ___" id="room_types_title_red" data-title="Select your room type."></i>
						<span class="___" data-text="Select your room type."></span>
					    
					    <i class = "fas fa-caret-down" ></i >
					    <i class = "fas fa-caret-up" ></i >
					    
					    <span class = "float-right ___" data-text="Click on any image to enlarge it !" ></span >
					   
					</p >
` );
		$.each ( room_types, function ( index, room_type )
		{
			
			room_types_div
				.append ( `
						<div class = "card  col-lg-2 col-md-3 col-sm-4 col-4 room_type_images " >
						    <img src = "assets/src/images/room_types/${ room_type }.jpg" class = "form_image img-thumbnail ___"
						        alt=" "
						          data-alt = ":room_type bedroom image" alt=" "
							         data-title=":room_type bedroom image"
							         data-room_type = "${ room_type }"
							        >
						         
						       
						         <!--IF WE HAVE OWNERS ROOM , SETTING FOOTER TO bg_green AS SELECTED-->
						        
						    <div class = "p-0 card-footer text-center
							${ owners_room_type && parseInt ( owners_room_type ) === parseInt ( index )
				               ? 'bg_green'
				               : 'bg_green_dark' } text-light room_type"
						         id = "room_type_${ room_type }"
						         data-cy="room_type_footer_${index}">
						        <label for = "${ room_type }" class = "text-capitalize ___" data-text="${ room_type }"></label >
						      <br>
						        <!--IF WE HAVE ROOM  => SETTING ROOM'S OPTION TO checked-->
						        <input id = "${ room_type }" name = "room_type" type = "radio" value = "${ index }"
						               class = "collapse_parent check"
						               data-current_div = "room_type_images"
						               data-parent_title = "room_types_title"
						               data-next_div = "view_type_images"
						               data-footer = "room_type_${ room_type }"
						               data-type = "room_type"
						               data-cy="room_type_${index}"
						             ${ owners_room_type && parseInt ( owners_room_type ) === parseInt ( index )
				                        ? 'checked' : '' }
						        >
						    </div >
						</div >` );
		} );
	}


function render_view_types ()
	{
		
		var view_types_div   = $ ( '#view_types' );
		var owners_room_view = room ? room.p_view : '';
		
		for ( let view_type in view_types )
			{
				view_types_div
					.append ( `
							<div class = "card col-lg-2 col-md-3  col-sm-4 col-4 text-center view_type_images d-none" >
							    <img src = "assets/src/images/views/${ view_types[ view_type ] }.jpg" class = "form_image img-thumbnail ___"
							         data-alt = ":view_type view" alt=" "
							         data-title=":view_type view"
							         data-view_type = "${ view_types[ view_type ] }">
							         
							           <!--IF WE HAVE OWNERS ROOM , SETTING FOOTER TO bg_green AS SELECTED-->
							    <div class = "card-footer text-center  ${ owners_room_view && owners_room_view
					                                                      === view_type
					                                                      ? 'bg_green' : 'bg_green_dark' }   text-light  view_type p-0"
							         id = "view_type_${ view_type }"
							          data-cy="view_type_footer_${view_type}">
							          
							        <label for = "${ view_types[ view_type ] }" class = "text-capitalize ___"
							         data-text=":view_type view"
							          data-view_type = "${ view_types[ view_type ] }"
							          
							           ></label >
							        <br>
							         <!--IF WE HAVE ROOM => SETTING ROOM'S OPTION TO checked-->
							        <input name = "view_type" type = "radio" value = "${ view_type }"
							               class = "collapse_parent check"
							               data-current_div = "view_type_images"
							               data-parent_title = "view_types_title"
							               data-next_div = "room_style_images"
							               data-footer = "view_type_${ view_type }"
							               data-type = "view_type"
							                data-cy="view_type_${view_type}"
							               ${ owners_room_view && owners_room_view === view_type ? 'checked' : '' }
							        >
							    </div >
							</div >
						
							` );
			}
		$ ( '#view_types_title' )
			.append ( ` <p class = "card-text p-2 show_content" data-hidden_class="view_type_images"
                        data-cy="view_type_title">
 
 										 <!--IF WE HAVE OWNERS ROOM , GIVING "GREEN LIGHT" ( green circle with white check sign)-->
 											<i class="fas fa-check-circle green ${ room ? '' : 'd-none' } ___" id="view_types_title_green" data-title="View type selected."></i>
            								<i class="fas fa-question-circle red ${ room ? 'd-none' : '' } ___" id="view_types_title_red" data-title="Select your view type."></i>
                                    
                                    <span class="___" data-text="Select the view type your room has."></span>
                                    <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
                                    
        
                          </p >` );
		
	}


function render_room_styles ()
	{
		
		var room_styles_div   = $ ( '#room_styles' );
		var owners_room_style = room ? room.room_style : '';
		
		$ ( '#room_styles_title' )
			.append ( `
					<p class = "card-text p-2 show_content" data-hidden_class = "room_style_images"
					data-cy="room_style_title">
					
					 <!--IF WE HAVE OWNERS ROOM , GIVING "GREEN LIGHT" ( green circle with white check sign)-->
					
					   <i class="fas fa-check-circle green ${ room ? '' : 'd-none' } ___" id="room_styles_title_green" data-title="Room style selected."></i>
				       <i class="fas fa-question-circle red ${ room ? 'd-none' : '' } ___" id="room_styles_title_red" data-title="Select your room style."></i>
				       <span class="___" data-text="Select image your room will be displayed as."></span>
					    
					    <i class = "fas fa-caret-down" ></i >
					    <i class = "fas fa-caret-up" ></i >
					</p >` );
		
		for ( let room_style in room_styles )
			{
				room_styles_div
					.append ( `
							<div class = "card col-lg-2 col-md-3  col-sm-4 col-4 text-center room_style_images d-none" >
							    <img src = "assets/src/images/bedrooms/b${ room_styles[ room_style ] }.jpg" class = "form_image img-thumbnail"
							         alt = "bedroom image"
							          data-cy="room_style_image_${room_style}">
							         
							         <!--IF WE HAVE OWNERS ROOM , SETTING FOOTER TO bg_green AS SELECTED-->
							    <div class = "p-0 card-footer text-center
									${ owners_room_style && parseInt ( owners_room_style - 1 ) === parseInt (
						room_style ) ? 'bg_green'
					                 : 'bg_green_dark' }
									text-light d-flex justify-content-around align-items-center room_style"
							         id = "room_style_${ room_style }"
							         data-cy="room_style_footer_${room_style}">
							         
							        <label for = "${ room_styles[ room_style ] }" class = "text-capitalize" >#${ room_styles[ room_style ] }</label >
							        
							         <!--IF WE HAVE ROOM  => SETTING ROOM'S OPTION TO checked-->
							        <input  name = "room_style" type = "radio" value = "${ room_style }"
							               class = "collapse_parent check"
							               data-current_div = "room_style_images"
							               data-parent_title = "room_styles_title"
							               data-next_div = "board_type_images"
							               data-footer = "room_style_${ room_style }"
							               data-type = "room_style"
							               data-cy="room_style_${room_style}"
							               ${ owners_room_style && parseInt ( owners_room_style - 1 )
					                          === parseInt ( room_style )
					
					                          ? 'checked' : '' }
							        >
							    </div >
							</div >
		` );
			}
	}


function render_board_types ()
	{
		
		var board_types_div = $ ( '#board_types' );
		var owners_boards   = room ? room.price : '';
		
		for ( let board_type in board_types )
			{
				board_types_div
					.append ( `

							<div class = "card col-lg-3 col-md-3 col-sm-6 col-6  text-center board_type_images services d-none" >
						    <img src = "assets/src/images/board_types/${ board_type }.jpg" class = "form_image img-thumbnail  ___"
						         alt = " "
						           data-alt = ":board_type image" alt=" "
							         data-title=":board_type image"
							         data-board_type = "${ board_types[ board_type ] }">
						        
						          <!--IF WE HAVE OWNERS ROOM , SETTING FOOTER TO bg_green AS SELECTED-->
						          
						    <div class = "card-footer text-center    ${ owners_boards && board_type in owners_boards
					                                                    ? 'bg_green'
					                                                    : 'bg_green_dark' } text-light board_type_${ board_type }"
						         id = "board_type_${ board_type }"
						         data-cy="board_type_footer_${board_type}">
						         
						        <div class = "input-group mb-2 text-center" >
						            <div class = "input-group-prepend" >
						                <div class = "input-group-text bg-transparent border_bottom_only" >
						                
						                 <!--IF WE HAVE ROOM  => SETTING ROOM'S OPTION TO checked-->
						                    <input  class = "board_type check" id="board_${ board_type }" name = "board_type_${ board_type }"
						                           type = "checkbox"
						                           data-type = "board"
						                           data-board_type = "${ board_type }"
						                           data-parent_title = "board_types_title"
						                           data-footer = "board_type_${ board_type }"
						                           data-cy="board_type_${board_type}"
						                           ${ owners_boards && board_type in owners_boards ? 'checked' : '' } >
						                           
						                   
						                </div >
						            </div >
						            <label for = "${ board_types[ board_type ] }" class = "text-capitalize ___"
						            data-text="${ board_types[ board_type ] }" ></label >
						        </div >
						    </div >` );

//		IF WE HAVE OWNERS ROOM , AND BOARD IS SELECTED, DISPLAYING PRICE INPUT WITH PRICE
				if ( owners_boards[ board_type ] )
					{
						$ ( '#board_type_' + board_type )
							.append ( `
									<input
									  
											data-title = "EUR"
											type = "number"
											name = "board_type_${ board_type }_price"
											id="board_price_${ board_type }"
											class="board_price col-md-9 ml-1 form-control ___"
											data-c_box_id="${ board_type }"
		                                    data-placeholder = "EUR"
		                                    value="${ owners_boards[ board_type ] }"
		                                  
		                                    
		                            >` );
						
					}
			}
		$ ( '#board_types_title' )
			.append ( ` <p class = "card-text p-2 show_content" data-hidden_class="board_type_images"
                            data-cy="board_type_title">
 
 									 <!--IF WE HAVE OWNERS ROOM , GIVING "GREEN LIGHT" ( green circle with white check sign)-->
 											<i class="fas fa-check-circle green ${ room ? '' : 'd-none' } ___" id="board_types_title_green" data-title="Board type(s) selected."></i>
            								<i class="fas fa-question-circle red ${ room ? 'd-none' : '' } ___" id="board_types_title_red" data-title="Select your board type(s)."></i>
            								<i class="fas fa-exclamation-circle orange d-none ___" id="board_types_title_orange" data-title="Add price for the board !"></i>
                                     
                                      <span class="___" data-text="Select the board basis you can provide for your guests."></span>
                                       <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
        
                          </p >` );
		
	}


function render_amenities ()
	{
		
		var amenities_div    = $ ( '#amenities' );
		var owners_amenities = room ? room.amenities : '';
		
		$.each ( amenities_list, function ( index, amenity )
		{
			
			amenities_div.append ( `

		<div class = "card col-lg-4 col-md-6 col-sm-12 col-12 text-center amenities services d-none" >
		
		  <!--IF WE HAVE OWNERS ROOM , SETTING FOOTER TO bg_green AS SELECTED-->
		  
		    <div class = "card-footer text-center
		${ owners_amenities && owners_amenities.indexOf ( index ) !== -1 ? 'bg_green'
			                                                             : 'bg_green_dark' } text-light  p-0 amenity${ index }"
		    id = "amenity${ index }"
		     data-cy="amenity_footer_${index}">
		        <div class = "input-group mb-2" >
		            <div class = "input-group-prepend" >
		                <div class = "input-group-text bg-transparent border_bottom_only" >
		                
		                 <!--IF WE HAVE ROOM  => SETTING ROOM'S OPTION TO checked-->
		                    <input id = "${ amenity }" class = "amenity_type check" name = "amenities"
		                           type = "checkbox" value = "${ index }"
		                           data-type = "amenity"
		                           data-parent_title = "amenities_title"
		                           data-footer = "amenity${ index }"
		                           data-cy="amenity_${index}"
		                           ${ owners_amenities && owners_amenities.indexOf ( index ) !== -1 ? 'checked' : '' }
		                    >
		                </div >
		            </div >
		            <label for = "${ index } " class = "text-capitalize float-right ___" data-text="${ amenity }">
						
		            </label >
		        </div >
		    </div >
		</div >
							` );
		} );
		$ ( '#amenities_title' )
			.append ( `<p class = "card-text p-2 show_content" data-hidden_class = "amenities"
                        data-cy="amenity_title">
						    <!--IF WE HAVE OWNERS ROOM , GIVING "GREEN LIGHT" ( green circle with white check sign)-->
						    <i class = "fas fa-check-circle green ${ room ? '' : 'd-none' } ___" id = "amenities_title_green"
						       data-title = "Amenity selected." ></i >
						    <i class = "fas fa-question-circle red ${ room ? 'd-none' : '' } ___" id = "amenities_title_red"
						       data-title = "Select the amenities you can provide for your guests." ></i >
						       <span class="___" data-text="Select the amenities you can provide for your guests."></span>
						   
						    <i class = "fas fa-caret-down" ></i >
						    <i class = "fas fa-caret-up" ></i >
						</p >` );
		
	}


function render_description ()
	{
		
		var description_div  = $ ( '#description' );
		var room_description = room ? room.p_description : null;
		
		description_div
			.append ( `
						<div class = "input-group mb-2 description services d-none" >
								<div class = "input-group-prepend" >
								        <div class = "input-group-text bg-transparent border_bottom_only ___"
								             data-title = "Describe your room, make it attractive (min 30 - max 300 characters)" >
								            <i class = "fas fa-feather-alt" ></i >
								            <br >
								            <!--IF WE HAVE OWNERS ROOM , DISPLAYING ROOM DESCRIPTION-->
								            <span id = "room_description_length" >
								                ${ room_description ? (
				300 - room_description.length ) : '300' }
								            </span >
								        </div >
								  </div >
						
								  
									<div>
									<textarea class = "form-control " form = "add_your_room" id = "room_description" maxlength = "300"
								              name = "description" required rows = "4" data-placeholder="Describe your room, make it attractive (min 30 - max 300 characters)"
								              data-cy="description">
								    </textarea >
									</div>
								
						</div >` );
		
		
		$ ( '#description_title' )
			.append ( `
						<p class = "card-text p-2 show_content" data-hidden_class = "description"
						 data-cy="description_title">
						    <!--IF WE HAVE OWNERS ROOM , GIVING "GREEN LIGHT" ( green circle with white check sign)-->
						    <i class = "fas fa-check-circle green ${ room ? '' : 'd-none' } ___" id = "description_title_green"
						       data-title = "Your room description" ></i >
						    <i class = "fas fa-question-circle red ${ room ? 'd-none' : '' } ___" id = "description_title_red"
						       data-title = "Describe your room, make it attractive (min 30 - max 300 characters)" ></i >
						       <span class="___" data-text="Describe your room, make it attractive (min 30 - max 300 characters)"></span>
						    
						    <i class = "fas fa-caret-down" ></i >
						    <i class = "fas fa-caret-up" ></i >
						</p >` );
		
	}


render_room_types ();
render_view_types ();
render_room_styles ();
render_board_types ();
render_amenities ();
render_description ();