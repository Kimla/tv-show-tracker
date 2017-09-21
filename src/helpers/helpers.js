export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function getShowData(show) {
    let image = false;

    if ( show.image ) {
        image = show.image.medium.replace(/^http:\/\//i, 'https://');
    }

    return {
        'title': show.name,
        'image': image,
        'genres': show.genres.join(", "),
        'tvmaze_id': show.id,
    }
}
