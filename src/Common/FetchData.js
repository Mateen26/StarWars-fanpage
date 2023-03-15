export const FetchData = async (selectedPerson) => {
  try {
    if (selectedPerson) {
      const filmsUrls = selectedPerson?.films || [];
      const starShipsUrls = selectedPerson?.starships || [];
      const vehiclesUrls = selectedPerson?.vehicles || [];

      const requests = filmsUrls.map((url) => fetch(url));
      const shipRequests = starShipsUrls.map((url) => fetch(url));
      const vehiclesRequests = vehiclesUrls.map((url) => fetch(url));

      const [responses, shipResponses, vehiclesResponses] = await Promise.all([
        Promise.all(requests),
        Promise.all(shipRequests),
        Promise.all(vehiclesRequests)
      ]);

      const filmsData = await Promise.all(responses.map((res) => res.json()));
      const shipData = await Promise.all(shipResponses.map((res) => res.json()));
      const vehiclesData = await Promise.all(vehiclesResponses.map((res) => res.json()));

      return { filmsData, shipData, vehiclesData };
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};
