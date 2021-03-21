﻿using ApiOne.Interfaces;
using ApiOne.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiOne.Repositories
{
    public class AdRepository : IAdRepository
    {
        private IConfiguration _config;
        public AdRepository(IConfiguration config)
        {
            _config = config;
        }
        public AdRepository()
        {

        }

        private readonly string ConnectionString = "Data Source=DESKTOP-79B5CPA;Initial Catalog=adDB;Integrated Security=True";

        public Ad GetAd(int id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    string sql = "SELECT * from [Ad] where id=@Id";
                    var ad = conn.Query<Ad>(sql, new { Id = id }).FirstOrDefault();
                    return ad;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return null;
            }
        }
        
        public IEnumerable<Ad> GetAds()
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                string sql = "SELECT * from [Ad]";
                var ads = conn.Query<Ad>(sql).ToList();
                return ads;
            }
        }

        // na dw ta gamimena kleidia, mallon cascade h kati tetoio
        public bool DeleteAd(int id)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    string sql = "DELETE FROM [Ad] WHERE id=@Id";
                    var result = conn.Execute(sql, new {Id=id});
                    return true;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return false;
            }
        }

        public bool InsertAd(Ad ad)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    ad.Date = DateTime.Now.ToString();
                    ad.LastUpdate = DateTime.Now.ToString();
                    string sql = "  INSERT INTO [Ad] (title,Description,Date,State,Img,Type,Category,Condition,Customer,Manufacturer,LastUpdate)" +
                                "VALUES (@Title,@Description,@Date,@State,@Img,@Type,@Category,@Condition,@Customer,@Manufacturer,@LastUpdate)";
                    var result = conn.Execute(sql, new {ad.Title,ad.Description,ad.Date,ad.State,ad.Img,ad.Type,ad.Category,ad.Condition,ad.Customer,ad.Manufacturer,ad.LastUpdate});
                    return true;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return false;
            }
        }

        public Ad UpdateAd(Ad ad)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    ad.LastUpdate = DateTime.Now.ToString();
                    string sql = " UPDATE [Ad] SET Title=@Title,Description=@Description,LastUpdate=@LastUpdate,State=@State,Img=@Img,Type=@Type,Category=@Category,Condition=@Condition," +
                                    "Customer=@Customer,Manufacturer=@Manufacturer where id=@Id";
                    var result = conn.Execute(sql, new{ad.Title,ad.Description,ad.LastUpdate,ad.State,ad.Img,ad.Type,ad.Category,ad.Condition,ad.Customer,ad.Manufacturer,ad.Id
                    });
                    return ad;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return null;
            };
        }

        public IEnumerable<Category> GetCategories()
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                string sql = "SELECT * from [Category]";
                var categories = conn.Query<Category>(sql).ToList();
                return categories;
            }
        }

        public IEnumerable<Condition> GetConditions()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Manufacturer> GetManufacturers()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<State> GetStates()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Models.Type> GetTypes()
        {
            throw new NotImplementedException();
        }

        public bool SubscribeToCategory(int categoryId, int customerId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    
                    string sql = " insert into [SubscribedCategories] (customerId,categoryId) values (@CustomerId,@CategoryId)";
                    var result = conn.Execute(sql, new { CustomerId =customerId, CategoryId= categoryId });
                    return true;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return false;
            }
        }

        public bool AddToWishList(int adId, int customerId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {

                    string sql = "insert into [WishListt] (customerId,adId) values (@CustomerId,@AdId)";
                    var result = conn.Execute(sql, new { CustomerId = customerId, AdId = adId });
                    return true;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return false;
            }
        }

        public IEnumerable<CategoryNotification> GetCategoryNotifications(int CustmerId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    string sql = "SELECT * from [CategoryNotification] where CustomerId=@Id";
                    var categoryNotifications = conn.Query<CategoryNotification>(sql, new { Id = CustmerId }).ToList();
                    return categoryNotifications;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return null;
            }
        }

        public IEnumerable<WishListNotification> GetWishListNotifications(int custmerId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    string sql = "SELECT w.clicked,w.adId,c.username,a.Img,a.title,a.LastUpdate,w.clicked FROM [WishListNotification] w join [Ad] a ON (w.adId=a.id) join [Customer] c ON (c.id=w.customerId) where w.customerId=@CId";
                    var wishListNotifications = conn.Query<WishListNotification>(sql,new { CId= custmerId }).ToList();
                    return wishListNotifications;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return null;
            }
        }

        public IEnumerable<int> GetSuscribedCategories(int CustmerId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnectionString))
                {
                    string sql = "SELECT categoryId from [SubscribedCategories] where CustomerId=@Id";
                    var wishListNotifications = conn.Query<int>(sql, new { Id = CustmerId }).ToList();
                    return wishListNotifications;
                }
            }
            catch (SqlException sqlEx)
            {
                Debug.WriteLine(sqlEx);
                return null;
            }
        }

        public IEnumerable<CategoryNotification> GetWishList(int CustmerId)
        {
            throw new NotImplementedException();
        }
    }
}
