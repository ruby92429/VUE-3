export default {
  props: ["pageies", "getData"], //內層定義的page且要去v-bind
  //可以放入 {{pageies}}檢查有沒有正確傳入
  // :Key+123是為了避免重複故意寫的
  //:class={active:page=== pageies.current_page}如果當前迴圈跑的page= pageies.current_page則顯示active屬性藍色
  //如果沒有前一頁就加上disable的屬性 :class="{disabled:!pageies.has_pre}"
  //如果沒有下一頁就加上disable的屬性 :class="{disabled:!pageies.has_next}"
  //呼叫getData方法得知分頁 @click.prevent="getData(page)"
  //   @click.prevent="getData(pageies.current_page-1)用減1得到上一頁
  //   @click.prevent="getData(pageies.current_page+1)用加1得到下一頁

  /*emit的寫法 經由emit透過pagination元件觸發getData外層事件 */
  // 插入分頁modal
  /*
    template: `<nav aria-label="Page navigation example">
    {{pageies}}
    <ul class="pagination">
      <li class="page-item"  :class="{disabled:!pageies.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getData(pageies.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
  
     
      <li class="page-item" :class="{active:page=== pageies.current_page}" 
      v-for="page in pageies.total_pages" :key="page+'123'">
      <a class="page-link" href="#" @click.prevent="$emit('change-page',page)">{{page}}</a>
      </li>
  
     
      <li class="page-item" :class="{disabled:!pageies.has_next}">
        <a class="page-link" href="#" aria-label="Next"  @click.prevent="getData(pageies.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
  
    </ul>
  </nav>`, //建立元件
  */
  /*props的寫法 */
  // 插入分頁modal
  template: `<nav aria-label="Page navigation example">
    {{pageies}}
    <ul class="pagination">
      <li class="page-item"  :class="{disabled:!pageies.has_pre}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getData(pageies.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
  
     
      <li class="page-item" :class="{active:page=== pageies.current_page}" 
      v-for="page in pageies.total_pages" :key="page+'123'">
      <a class="page-link" href="#" @click.prevent="getData(page)">{{page}}</a>
      </li>
  
     
      <li class="page-item" :class="{disabled:!pageies.has_next}">
        <a class="page-link" href="#" aria-label="Next"  @click.prevent="getData(pageies.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
  
    </ul>
  </nav>`, //建立元件
};
