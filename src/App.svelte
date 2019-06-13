<script>
  import Modal from './Modal.svelte'
  import data from './data.json'

  export let logo

  let _showModal = false
  let films = []
  let selectedCharacterName = ''

  const showError = e => {
    hideModal()
    alert(e)
  }

  const resetFilms = () => {
    films = []
  }

  const showModal = () => {
    _showModal = true
  }

  const hideModal = () => {
    _showModal = false
  }

  const fmtDate = str => {
    return new Date(str).toDateString().replace(
      'Mon', 'Monday'
    ).replace(
      'Tue', 'Tuesday'
    ).replace(
      'Wed', 'Wednesday'
    ).replace(
      'Thu', 'Thursday'
    ).replace(
      'Fri', 'Friday'
    ).replace(
      'Sat', 'Saturday'
    ).replace(
      'Sun', 'Sunday'
    )
  }

  const chooseCharacter = async ev => {
    resetFilms()
    showModal()
    let data = []
    selectedCharacterName = ev.target.textContent
    try {
      data = await fetchData(
        ev.target.getAttribute('data-href')
      )
    } catch(e) {
      showError(e)
    }
    if (data.films) {
      Promise.all(data.films.map(film => {
        return fetchData(film)
      })).catch(e => {
        showError(e)
      }).then(newFilms => {
        films = newFilms
      })
    }
  }

  const fetchData = async url => {
    const res = await fetch(url)
    const text = await res.text()
    if (res.ok) {
      return JSON.parse(text)
    } else {
      throw new Error(text)
    }
  }
</script>

<style>
  button {
    margin-right: 10px;
  }
</style>

{#each data.characters as { name, url }, i}
  <button data-href="{url}" on:click='{chooseCharacter}'>{name}</button>
{/each}

{#if _showModal}
  <Modal logo={logo} on:close="{hideModal}">
    {#if films.length}
    <h2>
      Films starring {selectedCharacterName}
    </h2>
    {/if}

    <ul>
      {#each films as { title, release_date, url }, i}
      <li><a href="{url}">
          {title}, Released {fmtDate(release_date)}
        </a></li>
      {/each}
    </ul>
  </Modal>
{/if}