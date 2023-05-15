let base_status = [0,0,0,0,0,0,0,0];
let char_base_status = [0,0,0,0,0,0,0,0];
let weapon_base_status = [0,0,0,0,0,0,0,0];
let depend_status = [0,0,0,0,0,0,0];
let char_depend_status = [0,0,0,0,0,0,0];
let weapon_depend_status = [0,0,0,0,0,0,0];
let base_hp = 0;
let base_attck = 0;
let base_deff = 0;
let base_elm = 0;
let base_elm_charge = 0;
let base_cr = 0;
let base_cd = 0;
let base_dmg_buff = 0;
let af_score = 0

async function showTable() {
  document.getElementById("myTable").style.display = "table";
  base_status = await calculate_base_status();
  base_hp = base_status[0];
  document.getElementById("base_hp").textContent = base_hp;
  base_attck = base_status[1];
  document.getElementById("base_attck").textContent = base_attck;
  base_deff = base_status[2];
  document.getElementById("base_deff").textContent = base_deff;
  base_elm = base_status[3];
  document.getElementById("base_elm").textContent = base_elm;
  base_elm_charge = base_status[4];
  document.getElementById("base_elm_charge").textContent = base_elm_charge;
  base_cr = base_status[5];
  document.getElementById("base_cr").textContent = base_cr;
  base_cd = base_status[6];
  document.getElementById("base_cd").textContent = base_cd;
  base_dmg_buff = base_status[7];
  document.getElementById("base_dmg_buff").textContent = base_dmg_buff;
}

/////////////////////


async function calculate_char_base_status() 
{
  const char_name = document.getElementById("char_name").value;
  const response = await fetch("./data/character/" + char_name + ".json");
  const data = await response.json();
  const char_base_hp = data.ステータス.基礎HP["90"];
  const char_base_attck = data.ステータス.基礎攻撃力["90"];
  const char_base_deff = data.ステータス.基礎防御力["90"];
  const char_base_elm = data.ステータス.基礎元素熟知["90"];
  const char_base_elm_charge = data.ステータス.基礎元素チャージ効率["90"];
  const char_base_cr = data.ステータス.基礎会心率["90"];
  const char_base_cd = data.ステータス.基礎会心ダメージ["90"];
  const char_base_dmg_buff = data.ステータス.基礎ダメージバフ["90"];
  char_depend_status = data.ステータス.依存ステータス;
  char_base_status = [char_base_hp, char_base_attck, char_base_deff, char_base_elm, char_base_elm_charge, char_base_cr, char_base_cd, char_base_dmg_buff];
  console.log(char_base_status);
  return char_base_status;
}

///////////////  


async function calculate_weapon_base_status() {
  const weapon_name = document.getElementById("weapon_name").value;
  const response = await fetch("./data/weapon/" + weapon_name + ".json");
  const data = await response.json();
  const weapon_base_hp = data.ステータス.基礎HP["90"];
  const weapon_base_attck = data.ステータス.基礎攻撃力["90"];
  const weapon_base_deff = data.ステータス.基礎防御力["90"];
  const weapon_base_elm = data.ステータス.基礎元素熟知["90"];
  const weapon_base_elm_charge = data.ステータス.基礎元素チャージ効率["90"];
  const weapon_base_cr = data.ステータス.基礎会心率["90"];
  const weapon_base_cd = data.ステータス.基礎会心ダメージ["90"];
  const weapon_base_dmg_buff = data.ステータス.基礎ダメージバフ["90"];
  weapon_depend_status = data.ステータス.依存ステータス;
  weapon_base_status = [weapon_base_hp, weapon_base_attck, weapon_base_deff, weapon_base_elm, weapon_base_elm_charge, weapon_base_cr, weapon_base_cd, weapon_base_dmg_buff];
  console.log(weapon_base_status);
  return weapon_base_status;
  }
///////////////////


async function calculate_base_status() {
  char_base_status = await calculate_char_base_status();
  weapon_base_status = await calculate_weapon_base_status();
  base_hp = char_base_status[0] + weapon_base_status[0];
  base_attck = char_base_status[1] + weapon_base_status[1];
  base_deff = char_base_status[2] + weapon_base_status[2];
  base_elm = char_base_status[3] + weapon_base_status[3];
  base_elm_charge = char_base_status[4] + weapon_base_status[4];
  base_cr = char_base_status[5] + weapon_base_status[5];
  base_cd = char_base_status[6] + weapon_base_status[6];
  base_dmg_buff = char_base_status[7] + weapon_base_status[7];
  base_status = [base_hp, base_attck, base_deff, base_elm, base_elm_charge, base_cr, base_cd, base_dmg_buff];
  console.log(base_status);
  return base_status;
  }
////////////////////
  async function show_char_statsform()
   {
    await calculate_depend_status()

    let hp_form = document.getElementById("hp_form");
    let attck_form = document.getElementById("attck_form");
    let deff_form = document.getElementById("deff_form");
    let elm_form = document.getElementById("elm_form");
    let elm_charge_form = document.getElementById("elm_charge_form");
    let cr_form = document.getElementById("cr_form");
    let cd_form = document.getElementById("cd_form");
    let calculateButton = document.getElementById("calculateButton");
    
    hp_form.style.display = "none";  // HPフォームを非表示
    attck_form.style.display = "none";  // 攻撃力フォームを非表示
    deff_form.style.display = "none";  // 防御力フォームを非表示
    elm_form.style.display = "none";  // 元素熟知を非表示
    elm_charge_form.style.display = "none";  // 元素チャージ効率フォームを非表示
    cr_form.style.display = "none";  // 会心率フォームを非表示
    cd_form.style.display = "none";  // 会心ダメージフォームを非表示
    calculateButton.style.display = "block";
    
    if (depend_status[0] == 1) 
    {
      hp_form.style.display = "block";  // hpフォームを表示
    }
    
    if (depend_status[1] == 1) 
    {
      attck_form.style.display = "block";  // 攻撃力フォームを表示
    }
    if (depend_status[2] == 1) 
    {
      deff_form.style.display = "block";  // 防御力フォームを表示
    }
    if (depend_status[3] == 1) 
    {
      elm_form.style.display = "block";  // 元素熟知フォームを表示
    }
    if (depend_status[4] == 1) 
    {
      elm_charge_form.style.display = "block";  // 元素チャージ効率フォームを表示
    }
    if (depend_status[5] == 1) 
    {
      cr_form.style.display = "block";  // 会心率フォームを表示
    }
    if (depend_status[6] == 1) 
    {
      cd_form.style.display = "block";  // 会心ダメージフォームを表示
    }
}
//////////////////////
async function show_weapon_statsform()
   {
    await calculate_depend_status()

    let hp_form = document.getElementById("hp_form");
    let attck_form = document.getElementById("attck_form");
    let deff_form = document.getElementById("deff_form");
    let elm_form = document.getElementById("elm_form");
    let elm_charge_form = document.getElementById("elm_charge_form");
    let cr_form = document.getElementById("cr_form");
    let cd_form = document.getElementById("cd_form");
    let calculateButton = document.getElementById("calculateButton");
    
    hp_form.style.display = "none";  // HPフォームを非表示
    attck_form.style.display = "none";  // 攻撃力フォームを非表示
    deff_form.style.display = "none";  // 防御力フォームを非表示
    elm_form.style.display = "none";  // 元素熟知を非表示
    elm_charge_form.style.display = "none";  // 元素チャージ効率フォームを非表示
    cr_form.style.display = "none";  // 会心率フォームを非表示
    cd_form.style.display = "none";  // 会心ダメージフォームを非表示
    calculateButton.style.display = "block";
    
    if (depend_status[0] == 1) 
    {
      hp_form.style.display = "block";  // hpフォームを表示
    }
    
    if (depend_status[1] == 1) 
    {
      attck_form.style.display = "block";  // 攻撃力フォームを表示
    }
    if (depend_status[2] == 1) 
    {
      deff_form.style.display = "block";  // 防御力フォームを表示
    }
    if (depend_status[3] == 1) 
    {
      elm_form.style.display = "block";  // 元素熟知フォームを表示
    }
    if (depend_status[4] == 1) 
    {
      elm_charge_form.style.display = "block";  // 元素チャージ効率フォームを表示
    }
    if (depend_status[5] == 1) 
    {
      cr_form.style.display = "block";  // 会心率フォームを表示
    }
    if (depend_status[6] == 1) 
    {
      cd_form.style.display = "block";  // 会心ダメージフォームを表示
    }
}


/////////////////////
async function calculate_af_main_status_buff() 
{
  const clock_mainstatus = parseInt(document.getElementById("clock_mainstatus").value);
  const goblet_mainstatus = parseInt(document.getElementById("goblet_mainstatus").value);
  const circlet_mainstatus = parseInt(document.getElementById("circlet_mainstatus").value);
  const af_main_status = [0.466,0.466,0.583,187,51.8,31.1,62.2,0.466];
  let set_main_status = [0,0,0,0,0,0,0,0];
  let af_main_status_buff = [0,0,0,0,0,0,0,0];
  set_main_status[clock_mainstatus] = set_main_status[clock_mainstatus] + 1;
  set_main_status[goblet_mainstatus] = set_main_status[goblet_mainstatus] + 1;
  set_main_status[circlet_mainstatus] = set_main_status[circlet_mainstatus] + 1;
  for (let i = 0; i < 8; i++){
    af_main_status_buff[i] = af_main_status[i] *  set_main_status[i];
  }    
  console.log(af_main_status_buff);
  return af_main_status_buff;
}


//////////////////////////

async function calculate_af_score(af_main_status_buff,depend_status,base_status) 
{
  const af_hp = parseInt(document.getElementById("af_hp").value);//聖遺物HP上昇量
  const af_attck = parseInt(document.getElementById("af_attck").value);//聖遺物攻撃力上昇量
  const af_deff = parseInt(document.getElementById("af_deff").value);//聖遺物防御力上昇量
  const af_elm = parseInt(document.getElementById("af_elm").value);//聖遺物元素熟知上昇量
  const af_elm_charge= parseFloat(document.getElementById("af_elm_charge").value);//聖遺物会心率上昇量
  const af_cr= parseFloat(document.getElementById("af_cr").value);//聖遺物会心率上昇量
  const af_cd = parseFloat(document.getElementById("af_cd").value);//聖遺物会心ダメージ上昇量
  let af_score = 0
  for (let i = 0; i < 7; i++){
    if (depend_status[i]==0){
      continue;
    }
    switch (i)
    {
      case 0:
       af_score = af_score+((af_hp - 4780)/base_status[0] - af_main_status_buff[0])*400/3;
       break;
      case 1:
        af_score = af_score+((af_attck - 311)/base_status[1] - af_main_status_buff[1])*400/3;
        break;
      case 2:
        af_score = af_score + (af_deff/base_status[1] - af_main_status_buff[2])*1600/15;
        break;
      case 3:
        af_score = af_score + (af_elm -  af_main_status_buff[3])/3;
        break;
      case 4:
        af_score = af_score + (af_elm_charge - af_main_status_buff[4])*1.2;
        break;
      case 5:
        af_score = af_score + (af_cr - af_main_status_buff[5])*2;
        break
      case 6:
        af_score = af_score + (af_cd - af_main_status_buff[6]);
    }
  }
  console.log(af_score);
  return af_score
}


///////////////////
async function calculate_depend_status()
  {
    const char_name = document.getElementById("char_name").value;
    const char_response = await fetch("./data/character/" + char_name + ".json");
    const char_data = await char_response.json();
    const char_depend_status = char_data.ステータス.依存ステータス;
    const weapon_name = document.getElementById("weapon_name").value;
    const weapon_response = await fetch("./data/weapon/" + weapon_name + ".json");
    const weapon_data = await weapon_response.json();
    const weapon_depend_status = weapon_data.ステータス.依存ステータス;
    for (let i = 0; i < 7; i++){
      depend_status[i] = char_depend_status[i] + weapon_depend_status[i]
      if (depend_status[i]>1)
      {
        depend_status[i] = 1
      }
   }
   console.log(depend_status);
   return depend_status
  }

///////////////////

async function calculate_score_distribute(af_score,depend_status)
{
  let k = 0;
  let rundom_count = 0;
  let distribute = [];
  let score_distribution = [];
  for (let i = 0; i < 7; i++)
  {
    rundom_count = rundom_count + depend_status[i];
  }
  let randomNumbers = Array.from({ length: rundom_count - 1 }, () => af_score*Math.random());
  randomNumbers.sort((a, b) => a - b);
  distribute[0] = randomNumbers[0];
  for (let j = 1; j < randomNumbers.length; j++) {
    distribute[j] = randomNumbers[j] - randomNumbers[j - 1];
  }
  distribute[rundom_count - 1] = af_score - randomNumbers[rundom_count - 2];
  for (let i = 0; i < 7; i++)
  {
    if (depend_status[i]==0)
    {
    score_distribution[i] = 0;
    continue;
    }
    score_distribution[i] = depend_status[i] * distribute[k];
    k = k + 1; 
  }
  return score_distribution;
}


////////////////////////////////



async function calculate_fixed_status(sd,bs,amsb,ds)
//変数は左から（score_distribution,base_status,af_main_status_buff,depend_status）
{
  let fixed_status = [0,0,0,0,0,0,0,0];
  fixed_status[0] = bs[0]*(1 + sd[0]*3/400 + amsb[0]) + 4780;
  fixed_status[1] = bs[1]*(1 + sd[1]*3/400 + amsb[1]) + 311;
  fixed_status[2] = bs[2]*(1 + sd[2]*3/320 + amsb[2]);
  fixed_status[3] = bs[3] + sd[3]*3 + amsb[3];
  fixed_status[4] = bs[4] + sd[4]/120 + amsb[4]/100;
  fixed_status[5] = bs[5] + sd[5]/200 + amsb[5]/100;
  fixed_status[6] = bs[6] + sd[6]/100 + amsb[6]/100;
  fixed_status[7] = bs[7] + amsb[7];
  console.log(fixed_status);
  return fixed_status;
}


//////////////////////

class nahida {
  constructor(base_status, fixed_status, result_status) 
  {
    this.base_status = base_status;
    this.fixed_status = fixed_status;
    this.result_status = result_status;
  }

  calculate_char_HP() {
    return this.result_status[0];
  }

  calculate_char_attck() {
    return this.result_status[1];
  }

  calculate_char_deff() {
    return this.result_status[2];
  }

  calculate_char_elm() {
    return this.result_status[3];
  }

  calculate_char_elm_charge() {
    return this.result_status[4];
  }

  calculate_char_cr(result_status) {
    return Math.min(1,(this.result_status[5] +  Math.min(Math.max(0,(this.result_status[3]-200)),800)*0.0003));
  }

  calculate_char_cd() {
    return this.result_status[6];
  }

  calculate_char_dmg_buff() {
    return this.result_status[7] + Math.min(Math.max(0,(this.result_status[3]-200)),800)*0.001;
  }

}

class AThousandFloatingDreams {
  constructor(base_status, fixed_status, result_status) 
  {
    this.base_status = base_status;
    this.fixed_status = fixed_status;
    this.result_status = result_status;
  }

  calculate_weapon_HP() {
    return this.result_status[0];
  }

  calculate_weapon_attck() {
    return this.result_status[1];
  }

  calculate_weapon_deff() {
    return this.result_status[2];
  }

  calculate_weapon_elm() {
    fixed_status[3] = base_status[3] + 32;
    this.result_status[3] = this.result_status[3] + 32;
    return this.result_status[3];
  }

  calculate_weapon_elm_charge() {
    return this.result_status[4];
  }

  calculate_weapon_cr() {
    return this.result_status[5];
  }

  calculate_weapon_cd() {
    return this.result_status[6];
  }

  calculate_weapon_dmg_buff() {
    base_status[7] = base_status[7] + 0.2;
    this.result_status[7] = this.result_status[7] + 0.2;;
    return this.result_status[7];
  }

}

////////////////////////

async function create_char_instance(base_status, fixed_status, result_status) {
  const char_name = document.getElementById("char_name").value;
  if (char_name === "nahida") {
    // ナヒーダのインスタンスを生成
    const char_instance = new nahida(base_status, fixed_status, result_status);
    return char_instance;
  }
}
///////////////////////

async function create_weapon_instance(base_status, fixed_status, result_status) {
  const weapon_name = document.getElementById("weapon_name").value;
  if (weapon_name === "AThousandFloatingDreams") {
    const weapon_instance = new AThousandFloatingDreams(base_status, fixed_status, result_status);
    return weapon_instance;
  }
}

//////////////////////
async function monte_carlo_calculate()
{
  let fixed_status;
  let result_status;
  const base_status = await calculate_base_status();
  const af_main_status_buff = await calculate_af_main_status_buff();
  const char_instance = await create_char_instance(base_status, fixed_status, result_status);
  const weapon_instance = await create_weapon_instance(base_status, fixed_status, result_status);
  let depend_status = await calculate_depend_status();
  let af_score = await  calculate_af_score(af_main_status_buff,depend_status,base_status);

  let score_distribute = await calculate_score_distribute(af_score,depend_status);
  fixed_status = await calculate_fixed_status(score_distribute,base_status,af_main_status_buff,depend_status);
  result_status = fixed_status;

 result_status[0] += await char_instance.calculate_char_HP();
 result_status[0] += await weapon_instance.caculate_weapon_HP();

 result_status[1] += await char_instance.calculate_char_attck();
 result_status[1] += await weapon_instance.calculate_weapon_attck();

 result_status[2] += await char_instance.calculate_char_deff();
 result_status[2] += await weapon_instance.calculate_weapon_deff();

 result_status[3] += await char_instance.calculate_char_elm();
 result_status[3] += await weapon_instance.calculate_weapon_elm();

 result_status[4] += await char_instance.calculate_char_elm_charge();
 result_status[4] += await weapon_instance.calculate_weapon_elm_charge();

 result_status[5] += await char_instance.calculate_char_cr();
 result_status[5] += await weapon_instance.calculate_weapon_cr();

 result_status[6] += await char_instance.calculate_char_cd();
 result_status[6] += await weapon_instance.calculate_weapon_cd();

 result_status[7] += await char_instance.calculate_char_dmg_buff();
 result_status[7] += await weapon_instance.calculate_weapon_dmg_buff();
 document.getElementById("result_status").innerHTML = result_status.toString();

 console.log(result_status);
 return result_status;
}

