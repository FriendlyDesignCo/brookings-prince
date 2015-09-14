/* ---------------------------------- */
  
  $.fn.Article = function() {
   
     var $parent = this,
         HEIGHTS = new Array(),
         runningHeight = 0,
         _issue = $.Body.attr('data-issue'),
         _articleLength = this.length,
         _enumeratedArticles = 0,
         _active = 0,
         _active_figure = 0;

     /* ---------------------------------- */
     
     $.Body
      .bind($.Events.ARTICLE_NEXT,_next)
      .bind($.Events.ARTICLE_PREV,_prev)
      .bind($.Events.ARTICLE_ENTER,_enter)
      .bind($.Events.KEY_RIGHT,_keynext)
      .bind($.Events.KEY_DOWN,_keynext)
      .bind($.Events.KEY_LEFT,_keyprev)
      .bind($.Events.KEY_UP,_keyprev)
      
     $.Window
      .bind('resize',_resize);
      
     $('.scroll').bind('click',_clickthrough);
      
      window.onorientationchange = _orientation;


     /* ---------------------------------- */
     
     function _clickthrough(e) {
        
         e.preventDefault();

         var 
         target = $(e.currentTarget).attr('href'),
         $article = $(target).parents('.section'),
         index = $article.index()-1;
         
         _active = index;
         
         console.log(_active);
         
         
         var $figure_children = _figureChildren();
             

          if ($figure_children.length > 1){
              
            _active_figure++;
                
            if (_active_figure<$figure_children.length) {

                $figure_children.each(function(i){  

                if (i==_active_figure) {
                    
                    console.log('scrolling...');
                    
                  $.Scroll.stop().animate({scrollTop: HEIGHTS[_active].min + $(this).height()*i},600,'easeOutQuart')                               

                    
                }
                      
                          
                })
                         
            }else{
                  
              _active_figure = 0;
                  
              _next(e);
                
            }
                              
          }else{
                       
            _active_figure = 0;
                         
            _next(e);
              
          }         
          
          console.log(_active);
        
        
     }
     
     
     function _keynext(e) {
             
             e.preventDefault();

             var $figure_children = _figureChildren();
             

              if ($figure_children.length>1){
              
                _active_figure++;
                
                if (_active_figure<$figure_children.length) {

                    $figure_children.each(function(i){  

                    if (i==_active_figure) {
                    
                      $.Scroll.stop().animate({scrollTop: HEIGHTS[_active].min + $(this).height()*i},600,'easeOutQuart')                               

                    
                    }
                      
                          
                    })
                         
                }else{
                  
                  _active_figure = 0;
                  
                  _next(e);
                
                }
                              
              }else{
                       
                _active_figure = 0;
                         
                _next(e);
              
              }
              
     }
     
     function _keyprev(e) {
      
        e.preventDefault();

          var $figure_children = _figureChildren();
        
              if ($figure_children.length>1){
              
                _active_figure--;
                
                if (_active_figure>=0) {

                    $figure_children.each(function(i){  

                      if (i==_active_figure) 
                        $.Scroll.stop().animate({scrollTop: HEIGHTS[_active].min + $(this).height()*i},600,'easeOutQuart')
      
                    })
                         
                }else{
                  
                  _active_figure = 0;
                  
                  _prev(e);
                
                }
                              
              }else{
                       
                _active_figure = 0;
                         
                _prev(e);
              
              }
              
     }
     
     function _next(e) {

       _active++;
  
       if (_active>=_articleLength)
         _active = _articleLength-1;

       e.preventDefault();

       _seek(_active);
       

     }
     
     function _prev(e) {
       _active--;
  
       if (_active<0)
         _active = 0;
  
       e.preventDefault();
       
       _seek(_active);
     }
     
     function _seek(seek_index) {
     
      $.Scroll.stop().animate({scrollTop: HEIGHTS[seek_index].min},600,'easeOutQuart')
      
     }
     
    
     
     function _figureChildren() {
     
         var $f = {};
         
         $parent.each(function(index) {
        
          if (index==_active)
            $f = $(this).find('figure p.anchor')
          
        
         });
         

                             
         return $f;
     
     }

     
     function _articleprev(e){
     
     }
     
     function _enter(e,issue,id,index){

      //_active = index;
      
     }
     
     
     /* ---------------------------------- */
          
     function _resize() {
     
      runningHeight = 0;
      
      $parent.triggerHandler($.Events.RESIZE)
      
      _setBodyHeight();
      
     }
     
     function _orientation() {
  
        var orientation = window.orientation;
      
        $parent.triggerHandler($.Events.ORIENT,orientation);

     }
     
     function _setBodyHeight() {
     
       if (!$.MobileDevice)
         $.Body.css({height:runningHeight});
         
     }
     
     /* ---------------------------------- */
     
     this.each(function(index) { 
      
        var $self = $(this),
            $figure = $self.find('figure'),
            $figure_children = $figure.children(),
            $column = $self.find('.column'),
            $header = $self.find('header'),
            $numeral = $self.find('.numeral'),
            $extras = $self.find('.extras'),
            $videos = $self.find('[data-video]'),
            _view = '',
            _active_figure = 0,
            _id = $self.attr('data-google'),
            _titlePage = $self.hasClass('title-page'),
            _chapter = $self.hasClass('chapter'),
            _fullscreen = $self.hasClass('fullscreen'),
            _index = index,
            _fixedHeight =  $self.attr('data-height'),
            _columnHeight = $column ? $column.height() : 0,
            _figureHeight = $figure ? $figure.height() : 0,
            _ratio = 1200/1440;
        
          $parent
           .bind($.Events.RESIZE,_size)
           .bind($.Events.ORIENT,_size)

           
          
          if ($videos.length>0)
            $videos.Video({scope:$self});
          
          function _size() {
            
            _columnHeight = $column ? $column.height() : 0
            
            _figureHeight = $figure ? $figure.height() : 0
            
            HEIGHTS[index]= {
              min: runningHeight,
              max: runningHeight + _height() 
            };
            
            runningHeight+=_height();
            
            if (_chapter && !$.MobileDevice && !$.Tablet) {
            
              $header.css({top: _selfHeight()<$.Window.height() ? _selfHeight()/2 : $.Window.height()/2})
              
              $extras.css({top: _selfHeight()<$.Window.height() ? _selfHeight()/2 : $.Window.height()/2})
              
            }
            
            if (!$.MobileDevice) {
            
              $figure.css({height:_figureHeight})
           
              $self.css({height:_selfHeight(),overflow:'hidden',zIndex:1000-_index})
            
            }
            
          }
          
          _size();
          
          if (!$.MobileWebkit)
            $.Window.bind('scroll',_scroll)
          
          
          if (!_titlePage) {
            _enumeratedArticles++;
            $numeral.html('No. ' + _enumeratedArticles)
            
          }
          
  
        function _scroll(e) {
        
          var sTop = $.Window.scrollTop(),
              location = HEIGHTS[_index],
              vS = view_status(sTop);

            switch (vS){
            
              case "page":
                
                $self.css({marginTop: -(sTop-(location.min + _figureHeight )) , display:'block' })
                $figure.css({ marginTop: -(sTop - location.min ) })
                $self.triggerHandler($.Events.ARTICLE_SCROLL,sTop - location.min)
                
              break;
              
              case "inview":
                
                $figure.css({ marginTop: -(sTop - location.min ) })
                
                if (_view!=vS) 
                  $self.css({marginTop:0,display:'block'})
                
                $self.triggerHandler($.Events.ARTICLE_SCROLL,sTop - location.min)
                
              break;
              
              case "above":
              
                if (_view!=vS) {
                 $figure.css({marginTop: -_figureHeight - 25})
                 $self.css({marginTop:-_height() - 25,display:'none'})
                 $self.triggerHandler($.Events.ARTICLE_SCROLL,sTop - location.min)
                }
                
              break;
              
              case "outofview":

                if (_view!=vS) {
                 $self.triggerHandler($.Events.ARTICLE_SCROLL,0)
                 $figure.css({marginTop: 0}) 
                 $self.css({marginTop:0,display:'none'})
                }
                
              break;
              
              default:
              
                if (_view!=vS) {
                 $self.triggerHandler($.Events.ARTICLE_SCROLL,0)
                 $figure.css({marginTop: 0}) 
                 $self.css({marginTop:0,display:'block'})
                }
                
              break;
            
            }
            
            _view = vS
            
          
          

        }
        
        function view_status(sTop){
          
          var location = HEIGHTS[_index]
          
          if (sTop > location.min && sTop <= location.max) {           
            
            if (!$self.hasClass('_inview')) {
            
              $self.addClass('_inview');
              
              $.Body.triggerHandler($.Events.ARTICLE_ENTER, [_issue,_id,index]);
            
            }
              
            if (sTop >= location.min + _figureHeight)
              return 'page'
            else 
              return 'inview';
          
          }else{
          
            if ($self.hasClass('_inview'))
              $self.removeClass('_inview');
          
          }

          
          
          if (sTop <= location.min - $.Window.height() ) {
            $self.triggerHandler($.Events.ARTICLE_EXIT, [_issue,_id,index]);
            return 'outofview'; 
          }
            
          if (sTop <= location.min)
            return 'below';  
            
          
          if (sTop > location.max) {
            $self.triggerHandler($.Events.ARTICLE_EXIT, [_issue,_id,index]);
            return 'above'; 
          }
          
          
        }
        
        function _selfHeight() {
          
          var sH = $.Window.height(),
              sW = $.Window.width();
          
          if (_fixedHeight) { 

            return _fixHeight(_fixedHeight,sW,sH);
          
          }
            
          if ($.MobileWebkit)
            return (_figureHeight+250) > sH  ? _figureHeight + 250: sH;  
  
          return _columnHeight + 50 < sH ? sH : _columnHeight + 50;
        
        }

        function _height() {
  
          var winHeight = (_columnHeight + 50 < $.Window.height()) ? $.Window.height() : _columnHeight + 50,
              sW = $.Window.width();
  
          
          if (_fixedHeight) {
            
            return _fixHeight(_fixedHeight,sW);
            
          }


          return _figureHeight + winHeight 
          
        }
        
        function _fixHeight(_fixedHeight,sW) {
        
          

          if (_ratio*sW <= 1200){
            return 1200
          }
          
          if (_ratio*sW > 1200) {
            return _ratio*sW
          }
              
          
          return parseInt( _fixedHeight )
              
        }
        
        function _keyright(e) {
        
          e.preventDefault();

          if (_active==index) {

              if ($figure_children.length>1){
              
                _active_figure++;
                
                if (_active_figure<$figure_children.length) {

                    $figure_children.each(function(i){  

                    if (i==_active_figure) {
                      $.Scroll.stop().animate({scrollTop: $(this).offset().top -250},600,'easeOutQuart')
                    }
                          
                    })
                         
                }else{
                  
                  _active_figure = 0;
                  
                  setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_NEXT)},100)
                
                }
                              
              }else{
                       
                _active_figure = 0;
                         
                setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_NEXT)},100)
              
              }
              
          }
          

                   
        }
        
        function _keyleft(e) {
        
          e.preventDefault();
          
          if (_active==index) {

              if ($figure_children.length>1){
              
                _active_figure--;
                
                if (_active_figure>=0) {

                    $figure_children.each(function(i){  

                    if (i==_active_figure) {
                      $.Scroll.stop().animate({scrollTop: $(this).offset().top -250},600,'easeOutQuart')
                    }
                          
                    })
                         
                }else{
                  
                  _active_figure = 0;
                  
                  setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_PREV)},100)
                
                }
                              
              }else{
                       
                _active_figure = 0;
                         
                setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_PREV)},100)
              
              }
            
          }  
            
       
                
      }
        
        
       
     });
     
     _setBodyHeight()
     
    return this;
     
  }// JavaScript Document