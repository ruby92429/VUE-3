import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./pagination.js";

// let productModal = null;
// let delProductModal = null;
let productModal = {};
let delProductModal = {};

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "rubyvueweb",
      products: [],
      isNew: false, //判斷是編輯或新增所使用，新增為true，編輯為false
      tempProduct: {
        //imagesUrl: [], //改利用createImages() 加入陣列
      },
      pagination: {}, //儲存分頁資料
    };
  },
  // 因為區域元素可以加入很多個子元件，所以要加上s
  components: {
    pagination,
  },
  mounted() {
    console.log(bootstrap);
    productModal = new bootstrap.Modal( //bootstrap的初始化new
      document.getElementById("productModal"),
      {
        keyboard: false, //關閉鍵盤事件ex:不希望按esc關閉視窗
      }
    );

    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false, //關閉鍵盤事件ex:不希望按esc關閉視窗
      }
    );

    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)rubyToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token; // 意即在下次發送axios時，就會把token直接帶入headers中

    this.checkAdmin();
  },
  methods: {
    //step 1 : 先確認是否為登入狀態
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "index.html";
        });
    },
    // step 2 : 渲染所有產品至畫面上
    //傳入page參數來決定頁數，且可用預設參數=1，即當都沒有寫頁數時就為1
    getData(page = 1) {
      //加上網址的參數?page=${page}
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;

      axios
        .get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          // this.products = products;
          // console.log(this.products);

          this.pagination = response.data.pagination; //外層定義的page
          this.products = response.data.products;
          console.log(response.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "index.html";
        });
    },

    //step 3 : 判斷是開啟新增或編輯(其中新增或編輯modal可用 this.isNew判別)或刪除產品的modal
    openModal(status, item) {
      console.log(status);
      // productModal.show();
      if (status === "new") {
        productModal.show();
        this.isNew = true; //true表示為新增，開啟新增modal且要帶入初始化的資料
        //帶入上方初始化資料，因為建立新產品時初始資料欄位要清空
        this.tempProduct = {
          imagesUrl: [],
        };
      } else if (status === "edit") {
        productModal.show();
        this.isNew = false; //false表示為編輯，開啟編輯modal且要帶入要編輯的資料
        // 帶入要編輯的資料
        // 為了要避免修改到原始資料，解決方法:淺層拷貝，下面修改上面不會跟著連動
        this.tempProduct = { ...item };
      } else if (status === "delete") {
        delProductModal.show();
        this.tempProduct = { ...item }; //等等取id使用
      }
    },

    // step 4 :用this.isNew判斷是新增或編輯產品的資料送出
    updateProduct() {
      //用this.isNew判斷是用新增或編輯api
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`; //新增api
      let http = "post";
      //用this.isNew判斷是用新增或編輯api，觀察發現api不同處在method及路徑有無id，所以method用變數去帶
      if (!this.isNew) {
        //如果不是新增而是編輯，就改掉路徑及method
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`; //編輯api
        http = "put";
      }

      axios[http](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          productModal.hide(); //關閉modal
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //step 5 :刪除產品資料
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          // 渲染產品至畫面上
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    //因為初始化時沒有在tempProduct寫上陣列，所以加入此方法
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
  },
}).mount("#app");
