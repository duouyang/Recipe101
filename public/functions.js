// List of ingredients, pulled_idx, url
const p = ['Egg', 'Milk', 'Fish', 'Beef', 'Chicken', 'Tofu', 'Pork'];
const v = [ 'Avocado',  'Beans', 'Pepper', 'Cauliflower',
    'Cabbage', 'Lettuce', 'Carrot', 'Onion', 'Spinash', 'Tomato', 'Broccoli'];

// Read Checkbox @Dillon
function select() {
    var ingredients = []
    var boxes = document.getElementsByName("ingredient-check");
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            ingredients.push(boxes[i].value);
        }
    }
    console.log(ingredients);

    $.ajax({
        type: 'post',
        url: '/generate',
        data: {
            ingredient: ingredients
        },
        success: function(data) {

            $('span[class="expFlag"]').text("");
            //for each loop
            // console.log(data[0].name);
            $("#dymhtml").html("");
            for (var i = 0; i < data.length && i < 9; i++) {
                var recipe = data[i];
                console.log(recipe);
                // console.log(recipe);
                var name = recipe.name;
                names = name.split('-');
                name = names.join(' ');
                name = name.charAt(0).toUpperCase() + name.slice(1);
                var url = recipe.url;
                var image = recipe.image;
                if (image == "https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public?itok=Y6-bwmRb") {
                    image = "./images/egg.jpg";
                }
                let html = " <div class=\"col-lg-4 col-md-6 col-sm-12 icon-slide-container addPadding\"> <a href=\"";
                html += url + "\">";
                html += "<div class=\"image-container image\" style=\"background-image:url('";
                html += image;
                html += "')\"></div><h4 class=\"limitLine\">";
                html += name;
                html += "</h4></a></div>";
                $(html).hide().insertAfter($("#dymhtml")).fadeIn(800);
                console.log(html);
            }
        },
        error: function(err) {
            console.log(err);
        }

    });
}

function insertImageSubmit() {
    var data = new FormData();
    jQuery.each(jQuery('#file')[0].files, function(i, file) {
        data.append('filetoupload', file);
    });

    jQuery.ajax({
        url: '/insertImage',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        timeout: 10000,
        success: function(data) {
            $('input[type="checkbox"]').prop('checked', false);
            //for each loop
            // console.log(data[0].name);
            var ingreImg =[];
            for (var i of data.ingreL){
                ingreImg.push(i[0]);
                $('input[value=\"' + i[0] + '\"]').prop('checked', true);
            }
            console.log(ingreImg);
            var expireIn10d = data.exp;
            console.log(expireIn10d);
            var d = data.k;
            $('span[class="expFlag"]').text("");

            for (var e of expireIn10d){   
                $('div[value=\"' + e.ing +'\"]').find('span[class="expFlag"]').text(e.days + " days left");
            }

            $("#dymhtml").html("");
            
            for (var i = 0; i < d.length && i < 9; i++) {
                var recipe = d[i];
                console.log(recipe);
                // console.log(recipe);
                var name = recipe.name;
                var url = recipe.url;
                var image = recipe.image;
                if (image == "https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public?itok=Y6-bwmRb") {
                    image = "./images/egg.jpg";
                }
                let html = " <div class=\"col-lg-4 col-md-6 col-sm-12 icon-slide-container addPadding\"> <a href=\"";
                html += url + "\" target='_blank'>";
                html += "<div class=\"image-container image\" style=\"background-image:url('";
                html += image;
                html += "')\"></div><h4 class=\"limitLine\">";
                html += name;
                html += "</h4></a></div>";
                $(html).hide().insertAfter($("#dymhtml")).fadeIn(800);
                console.log(html);
            }

        },
        error: function(err) {
            console.log(err);
        }

    });
}