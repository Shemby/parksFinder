'use strict';

const apiKey = 'wxDkxzS9A2FDNCL3l6BKlWfJQfymgKVUiOb9VBNa';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';
const maxReturns = 'limit';
const states = [];

function formatStates(state){
    const states = `?stateCode=${state}&`;
    getData(states);
}
function display(responseJson) {
  console.log(responseJson);
  const max = $('.maxResults').val();
  $('#list').empty();
  $('#list').html(responseJson.data.map(o => {
    return `<li><h3>${o.fullName} (${o.states})</h3>
      <p>${o.description}</p>
      <a href="${o.url}>">${o.url}</a></li>`;
  }));
  states.length = 0; // clear the states array so we can start again
    $('.states-to-display').empty();
  $('#result').removeClass('hidden');
}
function getData(limit) {
  const url = `${searchUrl}?stateCode=${states.join(',')}&limit=${limit}&api_key=${apiKey}`;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(display)
    .catch(err => {
      $('#error-message').text(`something went wrong: ${err.message}`);
    });
}
function addState() {
  const state = $('.stateInput').val();
  if (state.length > 0) {
    states.push(state);
    $('.stateInput').val('');
  }

  $('.states-to-display').text(states.join(', '));
}
function listen() {
  $('form').submit(event => {
    event.preventDefault();
    addState();
    const limit = $('.maxResults').val();
    getData(limit);
  });
  $('.add-state').click(e => {
    addState();
  });
}

$(listen);