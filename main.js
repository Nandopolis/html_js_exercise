console.log('hola bola')

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

$(document).ready(() => {
    var $navLinks = $('.container a.nav-link');
    $navLinks.on('click', event => {
        var $navLink = $(event.target);
        $navLinks.removeClass('active');
        $navLink.addClass('active');

        var type = $navLink.text().toLowerCase();
        $.getJSON(`${POKEAPI_URL}/type/${type}/`, response => {
            const type_name = response.name.charAt(0).toUpperCase() + response.name.slice(1);
            $('#type-data').html(`
                <h2>${type_name}</h2>
                <div>
                    <div id="attack">
                        <h4>Attacks pros & cons</h5>
                    </div>
                    <div id="defense">
                        <h4>Defense pros & cons</h5>
                    </div>
                </div>
                <div>
                    <h4>Pokémon</h4>
                    <ul id="pokemon-list">
                        ${response.pokemon.reduce((all, pokemon) => `
                            ${all}
                            <li class="text-capitalize">${pokemon.pokemon.name}</li>
                        `, '')}
                    </ul>
                </div>
            `);
            for (const damage_relation in response.damage_relations) {
                if (Object.hasOwnProperty.call(response.damage_relations, damage_relation)) {
                    const types = response.damage_relations[damage_relation];
                    if (types.length > 0) {
                        const damage_relation_desc = getDamageRelationDescription(damage_relation, type_name);
                        const damage_relation_type = damage_relation.split('_').pop() === 'to' ? 'attack' : 'defense';
                        $(`#${damage_relation_type}`).append(`
                            <div>
                                <p>${damage_relation_desc}</p>
                                <ul>
                                    ${types.reduce((all, type) => `
                                        ${all}
                                        <li class="text-capitalize">${type.name}</li>
                                    `, '')}
                                </ul>
                            </div>
                        `);
                    }
                }
            }
        })
    });

    function getDamageRelationDescription(damage_relation, type) {
        switch (damage_relation) {
            case 'double_damage_from':
                return `These types are super effective against ${type} Pokémon:`;
            case 'double_damage_to':
                return `${type} moves are super effective against:`;
            case 'half_damage_from':
                return `These types are not very effective against ${type} Pokémon:`;
            case 'half_damage_to':
                return `${type} moves are not very effective against:`;
            case 'no_damage_from':
                return `These types have no effect on ${type} Pokémon`;
            case 'no_damage_to':
                return `${type} moves have no effect on:`;
            default:
                throw `unsupported damage_relation ${damage_relation}`;
        }
    }
});
