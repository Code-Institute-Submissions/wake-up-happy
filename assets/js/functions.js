//toggling  content of room details part of the form
$( document ).on( "click", ".show_content", function () {
	
	var hidden_class = $( this ).data( 'hidden_class' );
	
	$( '.' + hidden_class ).toggleClass( 'd-none' );
} );
//toggling size of images on form
$( document ).on( "click", ".form_image", function () {
	
	$( this ).parent().toggleClass( 'col-md-2' );
	
} );
// showing input for board price only when user selects board. removing input when user deselects board
$( document ).on( "click", ".board_type", function () {
	
	var board_type = $( this ).data( 'board_type' );
	var board_div = $( '#board_type_' + board_type );
	var board_price = $( '#board_price_' + board_type );
	
	if ( $( this ).is( ":checked" ) ) {
		
		board_div.append( `<input title = "price" type = "number" name = "board_type_${board_type}_price" id="board_price_${board_type}"
									class="board_price"  data-c_box_id="${board_type}"
                                       placeholder = "price" class = "ml-1 form-control"  value="">
                            </div >` );
	}
	else if ( $( this ).is( ":not(:checked)" ) ) {
		
		board_price.remove();
	}
	
} );
$( document ).on( "click", ".collapse_parent", function () {
	
	var parent_div = $( '.' + $( this ).data( 'parent_div' ) );
	var parent_title = $( '#' + $( this ).data( 'parent_title' ) );
	var next_div = $( '.' + $( this ).data( 'next_div' ) );
	
	parent_div.addClass( 'd-none' );
	parent_title.addClass( 'bg_green text-light' );
	next_div.removeClass( 'd-none' );
	
} );

// not to put nunmer_of_boards outside of function as global variable i use this function to keep it in
//https://stackoverflow.com/questions/12319598/jquery-mouse-click-counter
( function () {

//	FUNCTION TO GIVE USER COLOR FEEDBACK WHEN GOING THROUGH THE ADD ROOM FORM
	
	var num_of_boards = 0;
	var num_of_amenities = 0;
	var titles = [];
	var num_of_prices = 0;
	var step_4 = $( '#step_4' );
	
	
	
	$( document ).on( "click", ".check", function () {
		
		var parent_title = $( '#' + $( this ).data( 'parent_title' ) );
		var footer = $( '#' + $( this ).data( 'footer' ) );
		var type = $( this ).data( 'type' );
		
		if ( $( this ).is( ":checked" ) ) {

//			IF ANY OF THE RADIO'S WAS SELECTED, IT WOULD HAVE  bg_green CLASS APPLIED, SO THIS IS JUST TO RETURN IT
// TO ORIGINAL STATE
			if ( type === 'room_style' ) $( '.room_style' ).removeClass( 'bg_green' ).addClass( 'bg-secondary' );
			if ( type === 'view_type' ) $( '.view_type' ).removeClass( 'bg_green' ).addClass( 'bg-secondary' );
			if ( type === 'room_type' ) $( '.room_type' ).removeClass( 'bg_green' ).addClass( 'bg-secondary' );

//			HERE CHANGING COLOR OF TWO ELEMENTS TO bg_green
//			if ( type === 'board' && num_of_boards === 0 ) {
//				parent_title.addClass( 'bg_orange text-light' );
//			}
//			else {
//				parent_title.addClass( 'bg_green text-light' );
//			}
			parent_title.addClass( 'bg_green text-light' );
			
			titles[ type ] = 1;
			
			
			
			
			if ( type === 'board' ) {
				footer.removeClass( 'bg-secondary' ).addClass( 'bg_orange' );
				increment = true;
			}
			else {
				footer.removeClass( 'bg-secondary' ).addClass( 'bg_green' );
			}

//			CALCULATING HOW MANY CHECKBOXES WERE SELECTED-DESELECTED, NEEDED LATER IF USER DESELECTS ALL OF THEM , TO
// RETURN COLOR TO ORIGINAL STATE

//			if ( type === 'board' ) {
//				num_of_boards++;
//			}
			if ( type === 'amenity' ) {
				num_of_amenities++;
				
			}
			if(num_of_prices > 0 && num_of_prices > 0 && $('#room_description').val().length > 0)
			{
				step_4.removeClass('d-none');
			}
			//console.log('CHECK num_of_prices : '+num_of_prices,'num_of_amenities : '+num_of_amenities,'remaining_characters ',$('#room_description').val().length);
		}
		else if ( $( this ).is( ":not(:checked)" ) ) {
			
			if ( type === 'board' ) {
				num_of_boards--;
				num_of_prices--;
				
			}
			if ( type === 'amenity' ) {
				num_of_amenities--;
				
			}

//			IF ANY OF THE RADIO'S  OR CHECKBOXES WERE SELECTED, IT WOULD HAVE  bg_green CLASS APPLIED, SO THIS IS
// JUST TO RETURN IT TO ORIGINAL STATE
			footer.removeClass( 'bg_green' ).addClass( 'bg-secondary' );

//			IF USER HAS DESELECTED ALL OF PRECIOUSLY SELECTED CHECKBOXES ( board_types and amenities) , THIS IS TO
// REMOVE APPLIED CLASS
			if ( num_of_boards === 0 && type === 'board' ) {
				
				parent_title.removeClass( 'bg_green text-light' ).addClass( 'bg_orange' );
				delete titles[ type ];
				titles.splice( titles.indexOf( type ), 1 );
				step_4.addClass( 'd-none' );
				
			}
//			else if(num_of_boards > 0 && type === 'board')
//			{
//				parent_title.addClass( 'bg_green text-light' );
//				console.log('add step 4 if titles === 6')
//			}
			
			
			if ( num_of_amenities === 0 && type === 'amenity' ) {
				
				parent_title.removeClass( 'bg_green text-light' );
				delete titles[ type ];
				
				titles.splice( titles.indexOf( type ), 1 );
				step_4.addClass( 'd-none' );
				
			}
//			else if(num_of_amenities > 0 && type === 'amenity')
//			{
//				parent_title.addClass( 'bg_green text-light' );
//				console.log('add step 4 if titles === 6')
//			}
			
		}
		var num_of_titles = Object.keys( titles ).length;
		if ( num_of_titles === 3 ) {
			$( '#step_3' ).removeClass( 'd-none' );
		}
//		else {
//			$( '#step_3' ).addClass( 'd-none' );
//		}
		
		if ( num_of_titles === 5 ) {
			$( '#step_4' ).addClass( 'waiting_for_description' );
		}
		else {
			$( '#step_4' ).removeClass( 'waiting_for_description' );
		}
		
	} );
	
	
	var increment = true;
	$( document ).on( 'focusin', '.board_price', function () {
		if( $( this ).val() !== '')
		{
			increment = false;
		}
	}).on( 'focusout', '.board_price', function () {
	
		var price = $( this ).val();
		var c_box_id = $( this ).data( 'c_box_id' );
		
		if ( price > 0 ) {
			$( '#board_types_title' ).addClass( 'bg_green text-light' ).removeClass( 'bg_orange' );
			$( '#board_type_' + c_box_id ).addClass( 'bg_green text-light' ).removeClass( 'bg_orange' );
			
			if(increment)
			{
				num_of_prices++;
				num_of_boards++;
				
			}
			
		}
		else if ( price <= 0 ) {
			if(num_of_prices > 0)   {
				num_of_prices--;
				
			}
			if(num_of_boards > 0)	num_of_boards--;
			
			
			$( '#board_type_' + c_box_id ).removeClass( 'bg_green' ).addClass( 'bg-secondary' );
			$( '#board_' + c_box_id ).prop( 'checked', false );
			$( '#board_price_' + c_box_id ).remove();
			
			if ( num_of_boards === 0 && num_of_prices === 0 ) {
				$( '#board_types_title' ).removeClass( 'bg_green text-light' ).addClass( 'bg_orange' );
				step_4.addClass( 'd-none' );
				increment = true;
				
			}
			
		}
		// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
		if(num_of_prices > 0 && num_of_amenities > 0 && $('#room_description').val().length > 0)
		{
			step_4.removeClass('d-none');
		}
		
		//console.log('MOUSEINOUT num_of_prices : '+num_of_prices,'num_of_amenities : '+num_of_amenities,'remaining_characters ',$('#room_description').val().length);
	//	console.log( 'boards ' + num_of_boards, 'pRIces ' + num_of_prices , 'increment : '+	increment);
	
	} );
	
} )();

//FORM PROGRESS (STEPS) BUTTONS

$( document ).on( 'click', '.step', function () {
//	var step_id = $( this ).attr( 'id' );
	var step = $( this ).data( 'step' );
	
	if ( step === 1 ) {
		//$('#step_'+(step)).addClass('d-none active');
		//$('#step_'+(step - 1)).removeClass('d-none');
		$( this ).addClass( 'active' );
		
	}
	
	if ( step === 2 ) {
		//$('#step_'+(step + 1)).removeClass('d-none').addClass('active');
		$( '#step_' + ( step - 1 ) ).removeClass( 'd-none' );
		$( this ).removeClass( 'bg-success text-light' );
//		by clocking on map 60 characters added, so this is to clear it
		$('#room_description').html('').prop('placeholder','write something !');
		
		
	}
	if ( step === 3 ) {
		//$('#step_'+(step + 1)).removeClass('d-none').addClass('active');
		$( '#step_' + ( step - 1 ) ).removeClass( 'd-none' );
		$( this ).removeClass( 'bg-success text-light' );
		
	}
} );


function countChars()
{
	
	var room_desc = $('#room_description');
	var remaining_characters = 300 -  room_desc.val().length;
	var step_4 = $( '#step_4' );
	
	if(remaining_characters === 300)
	{
		$('#description_title').removeClass( 'bg_green text-light' );
		step_4.addClass( 'd-none' );
	}
	else
	{
		$('#description_title').addClass( 'bg_green text-light' );
//		IF TWO PREVIOUS TITLES WERE COMPLETED board_type and amenities, step_4 button should have class .waiting_for_description,
		// and we can display next step, otherwise we will hide it
		if(step_4.hasClass( 'waiting_for_description' ))
		{
			step_4.removeClass( 'd-none' );
		}
		
	}
	
	
	$('#room_description_length').addClass('text-danger').html(remaining_characters);
	
	
	
	
}
