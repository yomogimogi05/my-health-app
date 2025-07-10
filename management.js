const pass = prompt("パスワードを入力してください");
if (pass !== "yomogiabc") {
  document.body.innerHTML = "<h1>アクセスできません</h1>";
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function toggleChoices(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function selectValue(id, value) {
  const el = document.getElementById(id);
  const labelBtn = el.previousElementSibling;

  // データ属性に元ラベルを保存（初回のみ）
  if (!labelBtn.dataset.original) {
    labelBtn.dataset.original = labelBtn.textContent.split("：")[0];
  }

  labelBtn.textContent = `${labelBtn.dataset.original}：${value}`;
  el.style.display = 'none';
}


function saveMorning() {
    alert("記録を保存！（仮）✨");
    // 今後、localStorageなどで保存できるようにする予定！
}

function exportMorning() {
    const date = document.getElementById('datePicker').value;
    const wakeup = getSelectedText('morningWakeup');
    const condition = getSelectedText('morningCondition');
    const mental = getSelectedText('morningMental');
    const fatigue = getSelectedText('morningFatigue');
    const memo = document.getElementById('morningMemo').value || '（なし）';
    const wakeTime = document.getElementById('wakeTime').value || '（未入力）';
    const medTime = document.getElementById('medTime').value || '（未入力）';


    const text = `【朝の記録】（${date.replace(/-/g, "/")}）
・起きた時間：${wakeTime}
・薬を飲んだ時間：${medTime}
・起きた時の感覚：${wakeup}
・体調：${condition}
・メンタル：${mental}
・疲れやすさ：${fatigue}
・メモ：${memo}`;

    document.getElementById('exportText').textContent = text;
}

// 選んだテキストを表示する用（buttonのラベルから取得）
function getSelectedText(id) {
    const btn = document.getElementById(id).previousElementSibling;
    return btn.textContent.split("：")[1] || "（未選択）";
}

function exportAndCopyMorning() {
    exportMorning(); // 書き出し処理

    const text = document.getElementById('exportText').textContent;

    if (!text.trim()) {
        alert("コピーする内容がありません！");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            alert("📤 書き出してコピーできたよ！");
        })
        .catch(() => {
            alert("コピーに失敗しちゃったみたい…😢");
        });
}


// 夜の書き出し関数
function exportAndCopyNight() {
  const date = document.getElementById('datePicker').value;
  const condition = getSelectedText('nightCondition');
  const mental = getSelectedText('nightMental');
  const fatigue = getSelectedText('nightFatigue');
  const bath = getSelectedText('nightBath');
  const memo = document.getElementById('nightMemo').value || '（なし）';

  const text = `【夜の記録】（${date.replace(/-/g, "/")}）
・体調：${condition}
・メンタル：${mental}
・疲れやすさ：${fatigue}
・感情のゆらぎ・気づき：${memo}
・入浴 or シャワー：${bath}`;

  document.getElementById('exportNightText').textContent = text;

  if (!text.trim()) {
    alert("コピーする内容がありません！");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      alert("📤 書き出してコピーできたよ！");
    })
    .catch(() => {
      alert("コピーに失敗しちゃったみたい…😢");
    });
}


// 日付表示
window.onload = function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const dateInput = document.getElementById('datePicker');
    dateInput.value = todayStr; // 初期値を今日に設定
    ;

    // 朝の記録フォームを初期表示
    showSection('morning');


  // 朝：選択肢を開いておく
  ['morningWakeup', 'morningCondition', 'morningMental', 'morningFatigue'].forEach(id => {
    document.getElementById(id).style.display = 'block';
  });

  // 夜セクションを必ず非表示にしておく（念のため）
  document.getElementById('night').classList.remove('active');

}
