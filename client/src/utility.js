module.exports = {
  formatDuration(in_secs) {
    // format to days, hours, minutes, seconds
    let days = Math.floor(in_secs / 86400);
    let hours = Math.floor((in_secs % 86400) / 3600);
    let minutes = Math.floor(((in_secs % 86400) % 3600) / 60);
    let seconds = ((in_secs % 86400) % 3600) % 60;

    let timeStudying = "";
    if (days > 0) {
      timeStudying += days + " days ";
    }
    if (hours > 0) {
      timeStudying += hours + " hours ";
    }
    if (minutes > 0) {
      timeStudying += minutes + " minutes ";
    }

    return timeStudying;
  },
};
