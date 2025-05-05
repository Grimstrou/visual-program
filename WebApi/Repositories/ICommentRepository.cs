//определяем методы

using System.Collections.Generic;
using WebApi.Models;

namespace WebApi.Repositories
{
    public interface ICommentRepository
    {
        IEnumerable<Comment> GetAll();
        Comment? GetById(int id);
        void Add(Comment comment);
        void Update(int id, Comment updatedComment);
        void Delete(int id);
    }
}