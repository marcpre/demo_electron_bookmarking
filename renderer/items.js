
// Track items with array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

// Save items to localstorage
exports.saveItems = () => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Toggle item as selected
exports.selectItem = (e) => {
  $('.read-item').removeClass('is-active')
  $(e.currentTarget).addClass('is-active')
}

// Select next/prev item
exports.changeItem = (direction) => {

  // Get current active item
  let activeItem = $('.read-item.is-active')

  // Check direction and get next or previous read-item
  let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item')

  // Only if item exists, make selection change
  if(newItem.length) {
    activeItem.removeClass('is-active')
    newItem.addClass('is-active')
  }
}

// Open item for reading
exports.openItem = () => {

  // Only if items have been added
  if( !this.toreadItems.length ) return

  // Get selected item
  let targetItem = $('.read-item.is-active')

  // Get item's content url
  let contentURL = targetItem.data('url')



  console.log('Opening Item')
  console.log(contentURL)
}

// Add new item
exports.addItem = (item) => {

  // Hide 'no items' message
  $('#no-items').hide()

  // New item html
  let itemHTML = `<a class="panel-block read-item" data-url="${item.url}">
                    <figure class="image has-shadow is-64x64 thumb">
                      <img src="${item.screenshot}">
                    </figure>
                    <h2 class="title is-4 column">${item.title}</h2>
                  </a>`
  // Apppend to read-list
  $('#read-list').append(itemHTML)

  // Attach select event handler
  $('.read-item')
    .off('click, dblclick')
    .on('click', this.selectItem)
    .on('dblclick', this.openItem)
}
