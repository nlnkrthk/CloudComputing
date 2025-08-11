// API testing functionality
document.addEventListener('DOMContentLoaded', function () {
  const helloBtn = document.getElementById('btnHello');
  const helloStatus = document.getElementById('helloStatus');
  const helloOut = document.getElementById('helloOut');

  if (helloBtn) {
    helloBtn.addEventListener('click', async () => {
      helloBtn.disabled = true;
      helloStatus.textContent = 'Calling /api/hello…';
      helloOut.style.display = 'none';
      try {
        const res = await fetch('/api/hello');
        const txt = await res.text();
        helloStatus.innerHTML = res.ok ? 'OK' : 'Error';
        helloOut.textContent = txt;
        helloOut.style.display = 'block';
      } catch (e) {
        helloStatus.innerHTML = 'Network error';
        helloOut.textContent = String(e);
        helloOut.style.display = 'block';
      } finally {
        helloBtn.disabled = false;
      }
    });
  }

  const btnStudent = document.getElementById('btnStudent');
  const studentOut = document.getElementById('studentOut');

  if (btnStudent) {
    btnStudent.addEventListener('click', async () => {
      const idInput = document.getElementById('studentId');
      const id = idInput ? idInput.value.trim() : '';
      if (!id) { alert('Enter a StudentID'); return; }

      btnStudent.disabled = true;
      studentOut.style.display = 'none';
      studentOut.textContent = '';
      try {
        const res = await fetch('/api/get_student?studentId=' + encodeURIComponent(id));
        const text = await res.text();
        studentOut.textContent = text;
        studentOut.style.display = 'block';
      } catch (e) {
        studentOut.textContent = String(e);
        studentOut.style.display = 'block';
      } finally {
        btnStudent.disabled = false;
      }
    });
  }
});
