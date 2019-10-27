const canvas = document.getElementById('canvas');
const img = document.getElementById('img_canvas');
const switchArr = document.getElementsByName('dataSwitch');

switchArr.forEach((item) => {
  item.addEventListener('change', choiceData);
});

function choiceData() {
    if (switchArr[0].checked) {
      img.classList.add('hidden');
      canvas.classList.remove('hidden');
      do4x4picture(arr4x4, canvas);
    }

    else if (switchArr[1].checked) {
      img.classList.add('hidden');
      canvas.classList.remove('hidden');
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let data32x32 = ctx.getImageData(0, 0, canvas.width, canvas.height);
      do32x32picture(data32x32.data, arr32x32, canvas);
      ctx.putImageData(data32x32, 0, 0);

    } else if (switchArr[2].checked) {
      canvas.classList.add('hidden');
      img.classList.remove('hidden');
    }
};

function do4x4picture (array, canvas) {
    let ctx = canvas.getContext('2d');
    let step = canvas.width / array.length;
    array.forEach((el1, i) => {
      el1.forEach((el2, j) => {
        ctx.fillStyle = "#" + el2;
        ctx.fillRect(j*step, i*step, step, step);
      });
    });
};
  
function do32x32picture(data, array, canvas) {
    let step = canvas.width / array.length;
    let counter = 0;
    array.forEach(col => {
      for (let i = 0; i < step; i++) {
        col.forEach(row => {
          for (let j = 0; j < step; j++) {
            data[counter] = row[0];
            data[counter + 1] = row[1];
            data[counter + 2] = row[2];
            data[counter + 3] = row[3];
            counter += 4;
          };
        });
      };
    });
};
