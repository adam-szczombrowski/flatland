(function(){

var app = angular.module('timeline',['templates', 'ngRoute']);
app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "index.html",
      controller: 'GameController'
    });
  }
]);


  app.controller('GameController', function(){
    this.start = false;
    this.points = 0;
    this.cards = cards;
    this.cards_in_game = [];
    this.cards_in_game.push(getNew(this.cards));
    this.newCard = getNew(this.cards);
    this.visibleCards = [];
    this.visibleCards = getVisibleCards(this.cards_in_game);
    this.selectPlace = function(event){
      var card_year = this.newCard.year;
      var id_left = event.target.id-1;
      var id_right = event.target.id - (-1);
      var year_left, year_right;
      var success = false;
      if(id_left >= 0 )
      {
        year_left = $('#' + id_left).find('.year').text();
      }
      if(id_right <= 6)
      {
        year_right = $('#' + id_right).find('.year').text();
      }
      if(year_left)
      {
        var ind_left = findWithAttr(this.cards_in_game, 'year', year_left);
        var ind_right;
        if(ind_left == this.cards_in_game.length - 1)
        {
          if(year_left <= card_year)
          {
            success = true;
          }
        }
        else{
          ind_right = ind_left+1;

          if(year_left <= card_year && this.cards_in_game[ind_right].year >= card_year)
          {
            success = true;
          }
        }
      }
      if(year_right)
      {
        var ind_right = findWithAttr(this.cards_in_game, 'year', year_right);
        var ind_left;
        if(ind_right == 0)
        {
          if(year_right >= card_year)
          {
            success = true;
          }
        }
        else{
          ind_left = ind_right - 1;
          if(year_right >= card_year && this.cards_in_game[ind_left].year <= card_year)
          {
            success = true;
          }
        }
      }

      if(success)
      {
        var ind = event.target.id / 2;
        this.cards_in_game.push(this.newCard);
        this.cards_in_game.sort(function(a,b){
          return a.year - b.year;
        });
        this.points += 1;
        // $('.points').animate({fontSize: '40px'}, 500).animate({fontSize: '30px'}, 500);
        $('.correct').toggleClass('hidden');
        $('.correct').animate({fontSize: '34px'}, 500).animate({fontSize: '28px'}, 500);
        setTimeout(function(){
          $('.correct').toggleClass('hidden');
        }, 1000);
        this.newCard = getNew(this.cards);
        this.visibleCards = getVisibleCards(this.cards_in_game);
      }else {
        $('.wrong').toggleClass('hidden');
        $('.wrong').animate({fontSize: '34px'}, 500).animate({fontSize: '28px'}, 500);
        setTimeout(function(){
          $('.wrong').toggleClass('hidden');
        }, 1000);
        this.newCard = getNew(this.cards);
      }
      if(this.points == 6)
      {
        alert('Congratulations! You won!');
        this.points = 0;
        this.cards = cards;
        this.cards_in_game = [];
        this.cards_in_game.push(getNew(this.cards));
        this.newCard = getNew(this.cards);
        this.visibleCards = [];
        this.visibleCards = getVisibleCards(this.cards_in_game);
        this.start = false;
      }
    };
    this.clickStart = function(){
      this.start = true;
    };
    this.arrowVisible = function(direction){
      if (this.visibleCards.length > 2 )
      {
        var index = this.cards_in_game.indexOf(this.visibleCards[0]);
        if(direction == 'left')
        {
          return index == 0 ? false : true;
        }
        else {
          return index == this.cards_in_game.length-3 ? false : true;
        }
      }
      else {
        return false;
      }
    };

    this.clickArrow = function(direction){
      var index = this.cards_in_game.indexOf(this.visibleCards[0]);
      if(direction == 'left')
      {
        if(index-1 >= 0)
        {
          this.visibleCards = this.cards_in_game.slice(index-1, index+2);
        }
      }
      else {
        if(index+3 < this.cards_in_game.length)
        {
          this.visibleCards = this.cards_in_game.slice(index+1, index+4);
        }
      }
    };
  });
  app.directive('newCard', function(){
    return{
      restrict: 'E',
      templateUrl: 'new-card.html'
    }
  });
  app.directive('card', function(){
    return{
      restrict: 'E',
      templateUrl: 'card.html'
    };
  });
  app.directive('leftArrow', function(){
    return {
      restrict: 'E',
      templateUrl: 'left-arrow.html'
    };
  });
  app.directive('emptyCard', function(){
    return {
      restrict: 'E',
      templateUrl: 'empty-card.html'
      };
  });
  app.directive('topPanel', function(){
    return {
      restrict: 'E',
      templateUrl: 'top-panel.html'
    };
  });
  app.directive('rightArrow', function(){
    return {
      restrict: 'E',
      templateUrl: 'right-arrow.html'
    };
  });
  app.directive('welcome', function(){
    return {
      restrict: 'E',
      templateUrl: 'welcome.html'
    };
  });
  var getVisibleCards = function(cards){
    var len = cards.length;
    if(len <= 3)
    {
      return cards;
    }
    return cards.slice(len/2-1,len/2+2);
  };

  var getNew = function(cards){
    var index = Math.floor(Math.random() * (cards.length));
    var new_card = cards[index];
    if (index > -1 ){
      cards.splice(index,1);
    }
    return new_card;
  };

  var findWithAttr = function(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] == value) {
              return i;
          }
      }
  };

var cards = [
  {name: 'Satellites', year: 1957, image: 'http://www.satellitetoday.com/long-form-stories/information-age-bringing-space-down-to-earth/images/intro-satellite.png' },
  {name: 'Television', year: 1925, image: 'http://pngimg.com/upload/tv_PNG474.png' },
  {name: 'Relativity theory', year: 1915, image: 'http://img01.ibnlive.in/ibnlive/uploads/2015/10/Albert-Einstein-formula.jpg' },
  {name: 'Telescope', year: 1609, image: 'http://www.celestron.com/media/1025/telescope-right.png' },
  {name: 'Bin liner', year: 1950, image: 'http://www.macbuildingproducts.com/images/13BINLINERHVY.gif' },
  {name: 'Bronze', year: -2200, image: 'http://vignette1.wikia.nocookie.net/runescape2/images/0/05/Bronze_2h_sword_detail.png/revision/latest?cb=20130412180635' },
  {name: 'Can opener', year: 1858, image: 'http://dayzrussia.com/wiki/images/e/e5/Can_opener.png' },
  {name: 'Cannon', year: 1313, image: 'http://vignette3.wikia.nocookie.net/hyruletotalwar/images/0/05/Labrynna_cannon.png/revision/latest?cb=20120204135036' },
  {name: 'Telephone', year: 1876, image: 'http://www.graphicsfuel.com/wp-content/uploads/2011/12/telephone-icon-512x512.png' },
  {name: 'Barometer', year: 1643, image: 'https://lh3.ggpht.com/TcorW8yiffM-J7HUE7xBHvg7v9Eb4oxonLKBM53EHsy_4pbFRuUOyYh_gaXoL5cnLzg=w300' },
  {name: 'Mini dress', year: 1962 },
  {name: 'Accordion', year: 1829, image: 'http://us.playhohner.com/typo3temp/pics/26c0a498e2.png' },
  {name: 'Glasses', year: 1299, image: 'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/glasses-.png' },
  {name: 'Newspaper', year: 1605, image: 'http://science-all.com/images/newspaper-clipart/newspaper-clipart-13.png' },
  {name: 'Screw', year: -250, image: 'http://pngimg.com/upload/screw_PNG3029.png' },
  {name: 'Compass', year: 1090, image: 'http://img03.deviantart.net/003e/i/2015/051/3/b/compass_png_by_lg_design-d8ir90s.png' },
  {name: 'Winchester rifle', year: 1866, image: 'http://www.tynesidesafetyglass.com/asset/image/br6-gun-winchester308.png' },
  {name: 'French revolution', year: 1789, image: 'http://alphahistory.com/frenchrevolution/wp-content/uploads/2012/11/liberty.png' },
  {name: 'Sextant', year: 1630, image: 'http://www.ballastpoint.com/wp-content/uploads/2013/09/ballast-point-sextant.png' },
  {name: 'Pencil', year: 1795, image:'http://efdreams.com/data_images/dreams/pencil/pencil-06.jpg' },
  {name: 'Morse alphabet', year: 1838, image: 'http://cryptomuseum.com/radio/morse/img/visual.png' },
  {name: 'Zeppelin', year: 1900, image: 'http://s.cdpn.io/79/zeppelin.png' },
  {name: 'Crossbow', year: -400, image: 'http://vignette3.wikia.nocookie.net/elderscrolls/images/1/15/Dwarvencrossbow3.png/revision/latest?cb=20120814142344' },
  {name: 'Ceramic', year: -9000, image: 'http://www.galeriatradycja.pl/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/7/9/79.png' },
  {name: 'Whiskey', year: 1494, image: 'http://www.paddywhiskey.com/img/image_cache/2l2atyi9ow9gukig/600x600.png' },
  {name: 'Locomotive', year: 1804, image: 'http://www.locomotivesoftware.com/images/locomotive.png' },
  {name: 'Milk cardboard', year: 1915, image: 'https://pixabay.com/static/uploads/photo/2012/04/24/21/18/milk-40900_960_720.png' },
  {name: 'Thermometer', year: 1612, image: 'https://pixabay.com/static/uploads/photo/2016/01/11/18/44/thermometer-1134182_960_720.png' },
  {name: 'Lightning rod', year: 1752, image: 'http://www.aiditecsystems.com/tienda/15-161-thickbox/lightning-rod-sigma-r-40-ese-.jpg' },
  {name: 'Violin', year: 1523, image: 'http://www.sriveenavani.com/courses/images/violin.png' },
  {name: 'Typewriter', year: 1714, image: 'https://vvvv.org/sites/default/files/Typewriter_0.png'},
  {name: 'Sign language', year: 1593, image: 'https://www.cwu.edu/foreign-language/sites/cts.cwu.edu.foreign-language/files/images/ASL.png' },
  {name: 'Adhesive tape', year: 1923, image: 'http://www.electrotape.com/images/products/705.png' },
  {name: 'Microscope', year: 1590, image: 'http://www.visioneng.com/Portals/0/CVStoreImages/DX21_Binocular_lab_microscope_01_507.png' },
  {name: 'Bicycle', year: 1817, image: 'http://images.clipartpanda.com/bicycle-20clip-20art-bicycle3.png' },
  {name: 'Corkscrew', year: 1795, image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-food-beverage/055801-black-ink-grunge-stamp-textures-icon-food-beverage-corkscrew-sc43.png' },
  {name: 'Transistor', year: 1947, image: 'http://cdn.zmescience.com/wp-content/uploads/2014/09/bc635-transistor.png' },
  {name: 'Catapult', year: -397, image: 'http://kgms.weebly.com/uploads/2/7/9/1/27910503/2456489_orig.png' },
  {name: 'Safe', year: 1844, image: 'http://vignette4.wikia.nocookie.net/fantendo/images/7/73/Safe.png/revision/latest?cb=20140720231410' },
  {name: 'Wheel', year: -3500, image: 'http://wagonwheelknoxville.com/wp-content/uploads/2015/01/wagonwheel-wheel-e1421952625654.png' },
  {name: 'Toothbrush', year: 1498, image: 'http://media.crest.com//images/crest-products/large/oralb-crossaction-pro-health-toothbrush.png' },
  {name: 'Blue jeans', year: 1873, image: 'http://pngimg.com/upload/jeans_PNG5779.png' },
  {name: 'Combustion engine', year: 1860, image: 'http://www.peterbilt.com/imgs/engines/bg-engine-mx13.png' },
  {name: 'Writing', year: -3400, image: 'http://360dayyear.com/files/egyptian-ebers-papyrus-page.png' },
  {name: 'Watch', year: 1504, image: 'https://lh3.googleusercontent.com/gXJhfknaVSP3Wds5mLBzzM7UOPf_oQFjlMyw5FLIGXTGPNkKzYiG4yS-1GPoTFKJZQg' },
  {name: 'Saxophone', year: 1846, image: 'http://www.dominicsmusic.com/photos/1101.jpg' },
  {name: 'Pen', year: 1938, image: 'http://cdn.surefire.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/e/pen4-bk_chrm.png'},
  {name: 'Laptop', year: 1981, image: 'http://www.techiesense.com/wp-content/uploads/2015/07/HP.png'},
  {name: 'RPG games', year: 1974, image: 'https://upload.wikimedia.org/wikipedia/commons/archive/2/2d/20100918100201!Dados_4_a_20_caras_trans.png'},
  {name: 'Rabies vaccine', year: 1885, image: 'http://ereidmiller.com/wp-content/uploads/2016/03/syringe-needle-png-needle-syringe.jpg'},
  {name: 'Airplane', year: 1903, image: 'http://kindersay.com/files/images/airplane.png'},
  {name: 'Syringe', year: 1841, image: 'http://ereidmiller.com/wp-content/uploads/2016/03/syringe-needle-png-needle-syringe.jpg'},
  {name: 'Barbed wire', year: 1867, image: 'http://www.clker.com/cliparts/b/d/c/3/1195434705459221745liftarn_Barbed_wire.svg.hi.png'},
  {name: 'Checque', year: 1742, image: 'http://www.virtualsplat.com/software-solution/slider1/b.png'},
  {name: 'Telegraph', year: 1837, image: 'https://culturexchange1.files.wordpress.com/2015/05/telegraph.png'},
  {name: 'Elecrical battery', year: 1800, image: 'http://www.switchedonkids.org.uk/images/what-is-electricity/battery.png'},
  {name: 'Flying ballon', year: 1783, image: 'http://static.wixstatic.com/media/864e10_3056a5b839444111bd9395964c48e6a6.png_srz_341_406_85_22_0.50_1.20_0.00_png_srz'},
  {name: 'CD disc', year: 1979, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Compact_disc.svg/500px-Compact_disc.svg.png'},
  {name: 'Computer mouse', year: 1963, image: 'http://pngimg.com/upload/computer_mouse_PNG7672.png'},
  {name: 'Dynamite', year: 1867, image: 'http://vignette3.wikia.nocookie.net/fallout/images/a/a3/Dynamite_%28Fallout_New_Vegas%29.png/revision/latest?cb=20120717020659'},
  {name: 'Encyclopedia', year: 1751, image: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Talmud_Set.png'},
  {name: 'Globe', year: 1492, image: 'https://pixabay.com/static/uploads/photo/2013/07/12/17/16/terrestrial-globe-151897_960_720.png'},
  {name: 'Motorcycle', year: 1868, image: 'http://polaris.hs.llnwd.net/o40/vic/2016/img/motorcycles/my16-motorcycles-page/cruisers-en-us.png'},
  {name: 'Penicilin', year: 1928, image: 'http://www.scienceprofonline.com/images/Penicillin_core.jpg'},
  {name: 'Stethoscope', year: 1816, image: 'https://pixabay.com/static/uploads/photo/2012/04/11/18/17/stethoscope-29243_960_720.png'},
  {name: 'Hourglass', year: 900, image: 'https://www.wpclipart.com/time/hourglass/hourglass_blue_T.png'},
  {name: 'Eiffel tower', year: 1889, image: 'http://www.travelatitsfinest.com/eiffeltower.png'},
  {name: 'Brick', year: -7000, image: 'http://mailbricks.com/wp-content/uploads/2015/01/brick1.png'},
  {name: 'Turntable', year: 1877, image: 'https://pixabay.com/static/uploads/photo/2014/03/25/17/01/turntable-297877_960_720.png'},
  {name: 'Metric system', year: 1799, image: 'http://abchurt.com.pl/_photo/base/132/linijka.png'},
  {name: 'Cork', year: 1695, image: 'http://www.officialpsds.com/images/thumbs/Cork-psd21711.png'},
  {name: 'Lightbulb', year: 1879, image: 'http://simpleicon.com/wp-content/uploads/light-bulb-3.png'},
  {name: '1-st model of Ford T', year: 1908, image:'http://static.foodservicewarehouse.com/Hubspot/Campaigns/2014/Landing/made-america4/images/ford-model-t.png'},
  {name: 'Bra', year: 1859},
  {name: 'Matches', year: 1827, image: 'http://www.clipartlord.com/wp-content/uploads/2014/11/match6.png'},
  {name: 'Paper', year: -200, image: 'https://pixabay.com/static/uploads/photo/2015/08/07/03/56/paper-878964_960_720.png'},
  {name: 'Tuning fork', year: 1711, image: 'http://veli.ee/tuningfork/img/A440.png'},
  {name: 'Nuclear bomb', year: 1945, image: 'https://pixabay.com/static/uploads/photo/2013/07/12/15/24/atomic-bomb-149833_960_720.png'}
];
})();
