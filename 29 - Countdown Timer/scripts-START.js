let countdown;

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  countdwon = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
    }
  }, 1000);
}