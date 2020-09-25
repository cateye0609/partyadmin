import { Component, OnInit, Input } from '@angular/core';
// Services
import { PostService } from '../../../_services/post.service';
// Models 
import { Post } from '../../../_models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  @Input('data') posts_list: Post[] = [];
  page: number = 1;

  total_pages: number

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    this.activatedRoute.params.subscribe(params => {
      this.page = params['page'];
      this.get_posts_list(this.page);
    })
  }

  // Lấy danh sách bài viết
  get_posts_list(page: number) {
    this.postService.get_posts_list(page).subscribe(
      res => {
        this.posts_list = res.data.value as Post[];
        this.total_pages = res.data.total_page;
        // this.page = page;
      },
      err => {
        console.error("Error: " + err.error.message);
      },
      () => {
        setTimeout(() => {
          this.datatable_generate();
        })
      }
    );
  }

  get_page(page: number) {
    this.router.navigate(['/post/list', page]).then(() => {
      window.location.reload();
    });
  }

  // Xóa bài viết 
  post_delete(id: string) {
    if (confirm("Are you sure to delete this post?")) {
      this.postService.delete_post(id).subscribe(
        (res) => {
          this.toastr.success("Delete post success!");
          this.loaddata();
        }
      );
    }
  }

  // Tạo datatable 
  datatable_generate() {
    var postsTable = $('#postsTable').DataTable({
      "paging": false
    });
  }
}
