

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const restaurants = [
        { name: 'O-tacos Bastogne', style: 'Tacos', image: 'OTH-01-0B2E-5FTT.png', url: 'https://o-tacos.com' },
        { name: 'Dim s', style: 'Sandwicherie', image: 'ipac.jpg', url: 'https://wallux.com/le-dims' },
        { name: 'Tomatine', style: 'Sandwicherie', image: 'images.jpg', url: 'https://sandwicherie-tomatine.be/' },
        { name: 'L autre Chapelle', style: 'Friterie', image: 'ipac (1).jpg', url: 'https://wallux.com/lautre-chapelle' },
        { name: 'Chez Cindy', style: 'Friterie', image: 'chez-cindy-friterie.jpg', url: 'https://chezcindy.be/' },
        { name: 'Botan', style: 'Kebab', image: 'images (1).jpg', url: 'https://www.facebook.com/p/Pita-Botan-100054688003032/?locale=fr_FR' },
        { name: 'Chez Barbaros', style: 'Kebab', image: 'ipac (2).jpg', url: 'https://wallux.com/pita-chez-barbaros-bastogne' },
        { name: 'Renval-On', style: 'Friterie', image: 'iloc.jpg', url: 'https://wallux.com/renvalon' },
        { name: 'Autrement', style: 'Sandwicherie', image: 'ra15-Autrement-Fast-food-advertisement.jpg', url: 'https://fr.restaurantguru.com/Lautrement-Bastogne' },
        { name: 'Au Petit Creux', style: 'Friterie', image: 'resto723.jpg', url: 'https://wallux.com/friterie-snack-le-petit-creux-bastogne' },
        { name: 'Bella-Ciao', style: 'Italien', image: 'PizzaLocal.jpg', url: 'https://pizzabellaciao.be/' },
        { name: 'Brasserie Lamborelle', style: 'Brasserie', image: 'brasserie-lamborelle-restaurant-bastogne-1.jpg', url: 'https://wallux.com/brasserie-lamborelle-bastogne' },
        { name: 'Jan Thaï', style: 'Thaïlandais', image: 'janthai-1024x768.jpg', url: 'https://www.janthai.be/' },
        { name: 'Cite Wok', style: 'Wok', image: 'OTH-01-0B0S-9FD7.png', url: 'https://www.facebook.com/Citewokbastogne/?locale=fr_FR' },
        { name: 'Sun From Tunisia', style: 'Tunisien', image: 'Untitled delivery/images (2).jpg', url: 'https://wallux.com/restaurant-au-soleil-de-tunisie-bastogne' },
        { name: 'Il Vinci', style: 'Italien', image: 'télécharger.jpg', url: 'http://www.ilvinci.be/expanded-menu/' },
        { name: 'Giorgi', style: 'Italien', image: 'OTH-A0-006I-0WL3.png', url: 'https://www.giorgi.be/' }
    ];

    const searchInput = document.getElementById('search');
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantSelect = document.getElementById('restaurant');
    const orderForm = document.getElementById('order-form');
    const orderSummary = document.getElementById('order-summary');

    function displayRestaurants(filteredRestaurants) {
        restaurantList.innerHTML = '';
        filteredRestaurants.forEach(restaurant => {
            const div = document.createElement('div');
            div.classList.add('restaurant');
            div.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}">
                <div>
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.style}</p>
                    <p class="delivery-price">Prix de livraison : 5€</p>
                    <a href="${restaurant.url}" target="_blank">En savoir plus</a>
                </div>
            `;
            restaurantList.appendChild(div);
        });
    }

    function populateRestaurantSelect() {
        restaurantSelect.innerHTML = '';
        restaurants.forEach(restaurant => {
            const option = document.createElement('option');
            option.value = restaurant.name;
            option.textContent = restaurant.name;
            restaurantSelect.appendChild(option);
        });
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRestaurants = restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchTerm) ||
            restaurant.style.toLowerCase().includes(searchTerm)
        );
        displayRestaurants(filteredRestaurants);
    });

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const restaurant = restaurantSelect.value;
        const dish = document.getElementById('dish').value;
        const quantity = document.getElementById('quantity').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <p>Restaurant: ${restaurant}</p>
            <p>Plat: ${dish}</p>
            <p>Quantité: ${quantity}</p>
            <p>Adresse: ${address}</p>
        `;
        orderSummary.appendChild(orderItem);

        // Envoyer l'email avec EmailJS
        emailjs.send('service_untitled', 'template_order', {
            restaurant: restaurant,
            dish: dish,
            quantity: quantity,
            address: address,
            phone: phone,
            email: email
        }, 'NXJos0R3SlRws2stA')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Commande réussie ! Un email de confirmation a été envoyé.');

            // Envoyer un email de confirmation à l'utilisateur
            emailjs.send('service_untitled', 'template_confirmation', {
                to_email: email,
                restaurant: restaurant,
                dish: dish,
                quantity: quantity,
                address: address,
                phone: phone
            }, 'NXJos0R3SlRws2stA')
            .then((response) => {
                console.log('Confirmation email sent!', response.status, response.text);
            }, (error) => {
                console.log('Failed to send confirmation email...', error);
            });
        }, (error) => {
            console.log('FAILED...', error);
            alert('Échec de la commande. Veuillez réessayer.');
        });

        orderForm.reset();
    });

    displayRestaurants(restaurants);
    populateRestaurantSelect();
});