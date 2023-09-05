import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}
  @ApiOperation({ description: "Creatrion of POst" })
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }
}
