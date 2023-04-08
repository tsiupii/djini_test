document.addEventListener("DOMContentLoaded", function() {
    
    // GET COUNT OF MEDIA ITEM TEXT

    let array = document.querySelectorAll(".media_content_area .text");
    
    array.forEach(element => {
        let elemStylesAll = getComputedStyle(element);
        let lineHeight = elemStylesAll['line-height'].replace('px', '');

        if ((element.offsetHeight / lineHeight) > 2) {

            element.classList.add('hidden_text');
            let textParent = element.parentNode;
            let toggleBtn = textParent.getElementsByClassName('toggle_text');
            
            // ADD CLASSNAME TO THE TOGGLE BTN
            
            toggleBtn[0].classList.add("visible");
            
        }
    });

    // CLICK EVENT ON SHOW MORE BTN

    let toggleBtn = document.querySelectorAll(".toggle_text.visible");

    toggleBtn.forEach(element => {

        let parentItem = element.parentNode.getElementsByClassName('text');

        if (element.classList.contains('visible')) {
            let counter = 0;

            element.onclick = function() {
                if (counter == 0) {
                    parentItem[0].classList.remove('hidden_text');
                    element.innerText = 'Hide';

                    counter++;
                }else{
                    parentItem[0].classList.add('hidden_text');
                    element.innerText = 'Show more...';
                    counter = 0;
                }
            };

        }
    });


    // INFINITE SCROLLING

    var listElm = document.querySelector('#media_content_area');
   

    var loadMore = function() {

        for (let i = loadCardCounter; i < loadCardCounter+2; i++) {
            fetch('https://picsum.photos/v2/list?page=1&limit=9')
            .then(response=>response.json())
            .then(data=>{

                var image = data[i]['download_url'];
                var title = data[i]['author'];

                const card =  `
                    <figure>
                    <img src="`+image+`" alt="">
                    </figure>
                    <div class="text_content">
                    <h3 class="h3 fw-bold">`+title+`</h3>
                    <p class="text">Here goes sere goes sere goes sere goes sere goes sere goes some sample, example text that is relatively short.</p>
                    <button class="toggle_text">Show more...</button>
                    </div>
                    <div class="media_item_bottom d-flex">
                    <button class="save_to_collection" type="button">Save to collection</button>
                    <button class="share" type="button">Share</button>
                    </div>`;

                var cardItem = document.createElement('div');
                cardItem.classList.add('media_item');
                cardItem.innerHTML = card;
                
                
                listElm.appendChild(cardItem);

            }).catch(err => {
                
            })
            
        }

    }

    // Detect when scrolled to bottom.

    let loadCardCounter = 0;
    const countLoadedCard = 2;

    window.addEventListener('scroll', function() {

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

            loadMore(numImages = countLoadedCard,loadCardCounter);
            loadCardCounter=loadCardCounter+countLoadedCard

        }
        
    });

});