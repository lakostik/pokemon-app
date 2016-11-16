$(document).ready(function(){
	var information = $('.list_pokemon');
	$.get('http://pokeapi.co/api/v1/pokemon/?limit=24', function dataList(data) {					
		
		$.each(data.objects, function(id, obj){
			var pokeName = obj.name;
			var	pokeId = obj.national_id;					
			information.prepend('<div class="item pokemon'+id+'"></div>');						
			//--- create items in pokedex ----------//
			$(".pokemon"+id).append('<img class="pokeImg" data-id="'+pokeId+'" src="http://pokeapi.co/media/img/'+pokeId+'.png" />');
			$(".pokemon"+id).append('<div class="pokeName">'+pokeName+'</div>');
			$(".pokemon"+id).append('<div class="types pokemon'+'-'+pokeId+'"></div>');
			$.each(obj.types, function(idi, aname){							
				$.each(aname, function(keytyp, nametype){
					if(aname = aname.name)
					$(".pokemon-"+pokeId).append('<div class="'+nametype+'">'+nametype+'</div>');
				});
			});

		});
		$('.preloader').css('display','none');
	});
	information.append('<div class="full-width"><p class="load_more">'+ 'Load More'+'</p></div>');
	
	//------- load more ---------//
	$('.load_more').bind('click',function(){
		$('.preloader').css('display','flex');
		var insexIdStart = $("div.item").length;  
		var insexId = (insexIdStart + 12);
		//-------- add new pokemon ----------//
		$.get('http://pokeapi.co/api/v1/pokemon/?limit=12&offset='+insexId, function dataList(data) {
			$.each(data.objects, function(id, obj){
				var pokeName = obj.name;
				var	pokeId = obj.national_id;
				var pokeSortId = id + insexIdStart;
				information.prepend('<div class="item pokemon'+pokeSortId+'"></div>');
				//--- create items in pokedex ----------//
				$(".pokemon"+pokeSortId).append('<img class="pokeImg" data-id="'+pokeId+'" src="http://pokeapi.co/media/img/'+pokeId+'.png" />');
				$(".pokemon"+pokeSortId).append('<div class="pokeName">'+pokeName+'</div>');
				$(".pokemon"+pokeSortId).append('<div class="types pokemon'+'-'+pokeId+'"></div>');
				$.each(obj.types, function(idi, aname){							
					$.each(aname, function(keytyp, nametype){
						if(aname = aname.name)
						$(".pokemon-"+pokeId).append('<div class="'+nametype+'">'+nametype+'</div>');
					});
				});
			});
			$('.preloader').css('display','none');
		});
	});
	$.get('http://pokeapi.co/api/v1/type/?limit=1000', function(data) {
		$.each(data.objects, function(id, obj){
			var aname = obj.name;	
			var aid = obj.id;
				if(obj = obj.name && obj.id <= 99)
				$("#type").append('<option data_id="'+aid+'">'+aname+'</option>');
			
		});
	});
});
//------ detail - information-pokemon -----//
	
$(document).on('click','.item',function(){
	$('.preloader').css('display','flex');
	$('.deteils_pokemon').html(' ');
	var porsonalId = $(this).children('img.pokeImg').attr('data-id');
	$.get('http://pokeapi.co/api/v1/pokemon/'+porsonalId+'/', function(data){
		var detailsPokemon = $('.deteils_pokemon');
		var offset = detailsPokemon.offset();
		detailsPokemon.append('<div class="details" style="left:'+offset.left+'px"></div>');				
		var imgSrc = data.national_id;				
		$('.details').append('<div class="imgSrc"><img src="http://pokeapi.co/media/img/'+imgSrc+'.png" /></div>');
		var namePok = data.name;
		$('.details').append('<div class="name">'+namePok+'</div>');
		
		$('.details').append('<div class="type_atk"><span>Type</span><span></span></div>');
		$.each(data.types, function(id, detail){
			$.each(detail, function(key, val){
				if(detail = detail.name)
					$('.type_atk > span:last-child').append('<div>'+val+'</div>')
			});
		});
		
		var attack = data.attack;
		$('.details').append('<div class="attack"><span>Attack</span><span>'+attack+'</span></div>');
		var defense = data.defense;
		$('.details').append('<div class="defense"><span>Defense</span><span>'+defense+'</span></div>');
		var hpPok = data.hp;
		$('.details').append('<div class="hpPok"><span>HP</span><span>'+hpPok+'</span></div>');
		var sp_atk = data.sp_atk;
		$('.details').append('<div class="sp_atk"><span>SP Attack</span><span>'+sp_atk+'</span></div>');
		var sp_def = data.sp_def;
		$('.details').append('<div class="sp_def"><span>SP Defense</span><span>'+sp_def+'</span></div>');
		var speed = data.speed;
		$('.details').append('<div class="speed"><span>Speed</span><span>'+speed+'</span></div>');
		var weight = data.weight;
		$('.details').append('<div class="weight"><span>Weight</span><span>'+weight+'</span></div>');
		var total_moves = $(data.moves).length;
		$('.details').append('<div class="total_moves"><span>Total moves</span><span>'+total_moves+'</span></div>');
		$('.preloader').css('display','none');
  });
});
$(document).on('click','.submit',function(){  
	var $idSelect = $("#type option[data_id]:selected").val().toLowerCase(); 
	var idSelect = $('div.'+$idSelect);
	$('div.item').css('display','none');
	$('.list_pokemon').find(idSelect).parents('div.item').css('display','inline');
});

//---- end details ----//

