//メモ帳を取得
const addBtn = document.getElementById('add');
const addBtn2 = document.getElementById('add2');

//ローカルストレージからデータを取得
const notes = JSON.parse(localStorage.getItem('notes'));
const notes2 = JSON.parse(localStorage.getItem('notes2'));

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
    <div class="tools" id="m_move">
        <button class="text_save" id="text_save">save</button>
        <button class="text_delete" id="text_delete">delete</button>
        <!--<button class="edit"><i class="fas fa-edit"></i></button>-->
        <button class="delete">trash</button>
    </div>
    <!--<div class="main ${text ? "" : "hidden"}"></div>-->
    <!--<textarea class="${text ? "hidden" : ""}"></textarea>-->
    <textarea class="text_area" id="text_area"></textarea>
    `




    //繰り返し処理増えた時の各メモ帳のテキストセーブ、削除準備
    /*let plus = document.getElementById('add');

    let sum = 0;
    plus.addEventListener('click', function(){
        sum++;
        console.log(sum);
    });
    
    const reText1 = document.getElementById('.text_save');
    const Btn1 = reText1.classList.add(sum);

    const reText2 = document.getElementById('.text_delete');
    const Btn2 = reText2.classList.add(sum);

    const reText3 = document.getElementById('.text_area');
    const Btn3 = reText3.classList.add(sum);*/


    //操作に必要な要素の取得
    const textSave = note.querySelector('.text_save');
    const textDelete = note.querySelector('.text_delete');
    //const memoMove = note.querySelector('m_move');
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


    //メモのドラックドロップ
    /*memoMove.addEventListener('click', () => {
        let ball = document.getElementById("m_move");
        ball.onmousedown = function(event){
            console.log("タップされたよ!");
        };
    });*/

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
    /*function editNote(main, textArea){
        //hiddenがついているものは消して、ついてないものは付与
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    }*/
    
    //メモ帳のドラックアンドドロップ(ボツコード)
    /*note1.onmousedown = function(event){

        let shiftX = event.clientX - note1.getBoundingClientRect().left;
        let shiftY = event.clientY - note1.getBoundingClientRect().top;

        note1.style.position = 'absolute';
        note1.style.zIndex = 1000;
        document.body.append(note1);

        moveAt(event.pageX, event.pageY);

        //メモ帳を(pageX、pageY)座標の中心に置く
        function moveAt(pageX, pageY){
            note1.style.left = pageX - shiftX + 'px';
            note1.style.top = pageY - shiftY + 'px';
        };

        function onMouseMove(event){
            moveAt(event.pageX, event.pageY);
        };

        //mosuemoveでボールを移動する
        document.addEventListener('mousemove', onMouseMove);

        //ボールをドロップする。不要なハンドラを削除する
        note1.onmouseup = function(){
            document.removeEventListener('mousemove', onMouseMove);
            note1.onmouseup = null;
        };
    };

    note1.ondragstart = function(){
        return false;
    };*/

    /*(function(){

        //要素の取得
        let elements = document.getElementsByClassName("drag-and-drop");
    
        //要素内のクリックされた位置を取得するグローバル（のような）変数
        let x;
        let y;
    
        //マウスが要素内で押されたとき、又はタッチされたとき発火
        for(let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mousedown", mdown, false);
            elements[i].addEventListener("touchstart", mdown, false);
        }
        
        //マウスが押された際の関数
        function mdown(e) {
    
            //クラス名に .drag を追加
            this.classList.add("drag");
            
            //タッチデイベントとマウスのイベントの差異を吸収
            if(e.type === "mousedown") {
                let event = e;
            } else {
                let event = e.changedTouches[0];
            }
    
            //要素内の相対座標を取得
            x = event.pageX - this.offsetLeft;
            y = event.pageY - this.offsetTop;
    
            //ムーブイベントにコールバック
            document.body.addEventListener("mousemove", mmove, false);
            document.body.addEventListener("touchmove", mmove, false);

            console.log(mdown);
        }
        
        //マウスカーソルが動いたときに発火
        function mmove(e) {
    
            //ドラッグしている要素を取得
            let drag = document.getElementsByClassName("drag")[0];
    
            //同様にマウスとタッチの差異を吸収
            if(e.type === "mousemove") {
                let event = e;
            } else {
                let event = e.changedTouches[0];
            }
           
            //フリックしたときに画面を動かさないようにデフォルト動作を抑制
            e.preventDefault();
    
            //マウスが動いた場所に要素を動かす
            drag.style.top = event.pageY - y + "px";
            drag.style.left = event.pageX - x + "px";
    
            //マウスボタンが離されたとき、またはカーソルが外れたとき発火
            drag.addEventListener("mouseup", mup, false);
            document.body.addEventListener("mouseleave", mup, false);
            drag.addEventListener("touchend", mup, false);
            document.body.addEventListener("touchleave", mup, false);
    
        }
    
        //マウスボタンが上がったら発火
        function mup(e) {
            let drag = document.getElementsByClassName("drag")[0];
    
            //ムーブベントハンドラの消去
            document.body.removeEventListener("mousemove", mmove, false);
            drag.removeEventListener("mouseup", mup, false);
            document.body.removeEventListener("touchmove", mmove, false);
            drag.removeEventListener("touchend", mup, false);
    
            //クラス名 .drag も消す
            drag.classList.remove("drag");
        }
    
    })()*/


    //第２のメモ追加

    //メモ帳追加処理の実行
    if(notes2){
    notes2.forEach(note2 => addNewNote2(note2));  
    };

    //作成ボタンのクリックイベント
    addBtn2.addEventListener('click', () => addNewNote2());

    //メモ帳の追加
    function addNewNote2(text = ''){
    //div要素の作成
    const note2 = document.createElement('div');
    //noteクラスの追加
    note2.classList.add('note2');
    
    //メモ帳追加
    note2.innerHTML = `
    <div class="tools" id="m_move">
        <button class="text_save" id="text_save">save</button>
        <button class="text_delete" id="text_delete">delete</button>
        <button class="delete">trash</button>
    </div>
    <div class="formarea">
    <div class="cp_iptxt">
	    <input type="text" placeholder="お名前" id="name">
	    <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
    </div>
    <div class="cp_iptxt iptxt2">
        <input type="datetime-local" id="datetime">
    </div>
    <div class="cp_iptxt iptxt3">
        <textarea row="10" cols="200" id="text_area"></textarea>
    </div>
    </div>
    `

    //操作に必要な要素の取得
    const textSave2 = note2.querySelector('.text_save');
    const textDelete2 = note2.querySelector('.text_delete');
    const deleteBtn2 = note2.querySelector('.delete');
    const textArea2 = note2.querySelector('.formarea');

    //テキストエリアにテキストを代入
    textArea2.value = text;

    //削除ボタンのクリックイベント
    deleteBtn2.addEventListener('click', () => {
        deleteNote(note2);
    });

    //テキストをローカルストレージに保存
    textSave2.addEventListener('click', () => {
        //要素取得
        const notesText2 = {
            name: $('#name').val(),
            datetime: $('#datetime').val(),
            text: $('#text_area').val(),
        };
        const notes2 = [];

        //要素を格納
        notesText2.forEach(note => notes2.push(note2.value));

        //ローカルストレージに保存
        const JsonData = JSON.stringify(notes2);
        localStorage.setItem('notes2', JsonData);
    });

    //ローカルストレージを削除
    textDelete2.addEventListener('click', () => {
         //メモ帳テキスト削除ボタン
        localStorage.removeItem('notes2');
        $('.formarea').val('');
    });

    //テキストエリアのイベント
    textArea2.addEventListener('input', (e) => {
        const { value } = e.target;
        //main.innerHTML = marked(value);

        //ローカルストレージの更新
        updateLS();
    });

    //bodyの子要素として追加
    document.body.appendChild(note2);
};

    //ローカルストレージにメモ帳を保存
    function updateLS(){
    };


    //メモ帳削除
    function deleteNote(note2){
        //ノートの削除
        note2.remove();
        //ローカルストレージ更新
        updateLS();
    };
    