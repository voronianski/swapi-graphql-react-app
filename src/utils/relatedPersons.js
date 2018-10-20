export default function relatedPersons(toPerson = {}, allPersons = []) {
  const toPersonFilms = toPerson.films || [];
  const relatedPersonsSet = allPersons.reduce((memoSet, person) => {
    toPersonFilms.reduce((prevFilm, film) => {
      if (!prevFilm.episodeId || prevFilm.episodeId + 1 === film.episodeId) {
        const personFilms = person.films || [];

        for (let i = 1; i < personFilms.length; i++) {
          const isInFilm = personFilms[i].id === film.id;
          const wasInPrevFilm = personFilms[i - 1].id === prevFilm.id;

          if (isInFilm && wasInPrevFilm) {
            memoSet.add(person);
            break;
          }
        }
      }

      return film;
    }, {});

    return memoSet;
  }, new Set([]));

  return [...relatedPersonsSet];
}
