document.addEventListener('DOMContentLoaded', () => {
    imageData.forEach((item) => {
      const section = document.querySelector(item.selector);
      if (section) {
        section.style.backgroundImage = `url('${item.image}')`;
      }
    });
  });