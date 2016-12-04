$(function(){
            var images_height = '350px';
            var images_url = [
                'images/1.jpg',
                'images/2.jpg',
                'images/3.jpg'
            ];
            var images_count = images_url.length;
            for(var j=0;j<images_count+1;j++){
                $('.banner ul').append('<li></li>')
            }
            for(var j=0;j<images_count;j++){
                if(j==0){
                    $('.banner ol').append('<li class="current"></li>')
                }else{
                    $('.banner ol').append('<li></li>')
                }
            }

            $('.banner ul li').css('background-image','url('+images_url[0]+')');
            $.each(images_url,function(key,value){
                $('.banner ul li').eq(key).css('background-image','url('+value+')');
            });

            $('.banner').css('height',images_height);

            $('.banner ul').css('width',(images_count+1)*100+'%');

            $('.banner ol').css('width',images_count*40+'px');
            $('.banner ol').css('margin-left',-images_count*40*0.5-10+'px');

            var num = 0;
            var window_width = $(window).width();
            $(window).resize(function(){
                window_width = $(window).width();
                $('.banner ul li').css({width:window_width});
                clearInterval(timer);
                nextPlay();
                timer = setInterval(nextPlay,3000);
            });
            $('.banner ul li').width(window_width);
            $('.banner ol li').click(function(){
                $(this).addClass('current').siblings().removeClass('current');
                var i = $(this).index();
                $('.banner ul').stop().animate({left:-i*window_width},1000);
                num = i;
            });
            var timer = null;
            function prevPlay(){
                num--;
                if(num<0){
                    $('.banner ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},500);
                    num=images_count-1;
                }else{
                    $('.banner ul').stop().animate({left:-num*window_width},500);
                }
                if(num==images_count-1){
                    $('.banner ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
                }else{
                    $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

                }
            }
            function nextPlay(){
                num++;
                if(num>images_count){
                    $('.banner ul').css({left:0}).stop().animate({left:-window_width},500);
                    num=1;
                }else{
                    $('.banner ul').stop().animate({left:-num*window_width},500);
                }
                if(num==images_count){
                    $('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
                }else{
                    $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

                }
            }
            timer = setInterval(nextPlay,3000);
            $('.banner').mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                timer = setInterval(nextPlay,3000);
            });
            
        });