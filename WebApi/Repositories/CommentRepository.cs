using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Comment> GetAll()
        {
            return _context.Comments.ToList();
        }

        public Comment? GetById(int id)
        {
            return _context.Comments.Find(id);
        }

        public void Add(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
        }

        public void Update(int id, Comment updatedComment)
        {
            var comment = _context.Comments.Find(id);
            if (comment != null)
            {
                comment.Author = updatedComment.Author;
                comment.Email = updatedComment.Email;
                comment.Text = updatedComment.Text;
                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges();
            }
        }
    }
}