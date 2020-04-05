const parser = data => {
  return data.split("\n").map(el => {
    const [
      airline,
      ,
      source,
      ,
      destination,
      ,
      isCodeShare,
      numStops
    ] = el.split(",");

    return {
      airline,
      source,
      destination,
      isCodeShare: isCodeShare === "Y",
      numStops
    };
  });
};

module.exports = parser;
