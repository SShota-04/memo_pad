//メモ帳を取得
const addBtn = document.getElementById('add');

//ローカルストレージからデータを取得
const notes = JSON.parse(localStorage.getItem('notes'));

//メモ帳追加処理の実行
if(notes){
    notes.forEach(note => addNewNote(note));  
    };

//作成ボタンのクリックイベント
addBtn.addEventListener('click', () => addNewNote());

//メモ帳の追加
function addNewNote(text = ''){
    //div要素の作成
    const note = document.createElement('div');
    //noteクラスの追加
    note.classList.add('note');
    console.log(note);
    //メモ帳追加
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    console.log(note);

    //操作に必要な要素の取得
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    console.log(editBtn, deleteBtn, main, textArea);

    //テキストエリアにテキストを代入
    textArea.value = text;
    //marked HTMLに追加したプラグイン
    //main.innerHTML = marked(text);

    console.log(textArea);
    console.log(main);
    //削除ボタンのクリックイベント
    deleteBtn.addEventListener('click', () => {
        deleteNote(note);
    });

    //編集ボタンのクリックイベント
    editBtn.addEventListener('click', () => {
        editNote(main, textArea);
    });

    //テキストエリアのイベント
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);

        //ローカルストレージの更新
        updateLS();
    });

    //bodyの子要素として追加
    document.body.appendChild(note);
};

    //ローカルストレージにメモ帳を保存
    function updateLS(){
        //要素取得
        const notesText = document.querySelectorAll('textarea');
        const notes = [];

        //要素を格納
        notesText.forEach(note => notes.push(note.value));

        //ローカルストレージに保存
        localStorage.setItem('notes', JSON.stringify(notes));
    };


    //メモ帳削除
    function deleteNote(note){
        //ノートの削除
        note.remove();
        //ローカルストレージ更新
        updateLS();
    };

    //メモ帳編集
    function editNote(main, textArea){
        //hiddenがついているものは消して、ついてないものは付与
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    }
    
