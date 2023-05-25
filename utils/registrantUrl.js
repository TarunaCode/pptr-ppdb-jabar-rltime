module.exports = (npsn, option_type) =>
  `https://api.ppdb.jabarprov.go.id/portal/registrant/selection/${npsn}?pagination=false&orderby=created_at&order=asc&search=&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&passed=true&filters[0][key]=accepted_option.type&filters[0][value]=${option_type}`;
