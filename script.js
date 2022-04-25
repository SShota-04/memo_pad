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
    //メモ帳追加
    note.innerHTML = `
    <div class="tools">
        <button class="text_save" id="text_save">save</button>
        <button class="text_delete" id="text_delete">delete</button>
        <!--<button class="edit"><i class="fas fa-edit"></i></button>-->
        <button class="delete">trash</button>
    </div>
    <!--<div class="main ${text ? "" : "hidden"}"></div>-->
    <!--<textarea class="${text ? "hidden" : ""}"></textarea>-->
    <textarea></textarea>
    `
    //操作に必要な要素の取得
    const textSave = note.querySelector('.text_save');
    const textDelete = note.querySelector('.text_delete');
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    /*const main = note.querySelector('.main');*/
    const textArea = note.querySelector('textarea');

    //テキストエリアにテキストを代入
    textArea.value = text;
    //marked HTMLに追加したプラグイン
    //main.innerHTML = marked(text);

    //削除ボタンのクリックイベント
    deleteBtn.addEventListener('click', () => {
        deleteNote(note);
    });

    //編集ボタンのクリックイベント
    /*editBtn.addEventListener('click', () => {
        editNote(main, textArea);
    });*/

    //テキストをローカルストレージに保存
    textSave.addEventListener('click', () => {
        //要素取得
        const notesText = document.querySelectorAll('textarea');
        const notes = [];

        //要素を格納
        notesText.forEach(note => notes.push(note.value));

        //ローカルストレージに保存
        const JsonData = JSON.stringify(notes);
        localStorage.setItem('notes', JsonData);
    });

    //ローカルストレージを削除
    textDelete.addEventListener('click', () => {
         //メモ帳テキスト削除ボタン
        localStorage.removeItem('notes');
        $('textarea').val('');
    });

    //テキストエリアのイベント
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        //main.innerHTML = marked(value);

        //ローカルストレージの更新
        updateLS();
    });

    //bodyの子要素として追加
    document.body.appendChild(note);
};

    //ローカルストレージにメモ帳を保存
    function updateLS(){
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
    
    