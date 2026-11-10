import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const utilizadorSchema = new mongoose.Schema(
   {
      nome: { type: String, required: [true, "O nome e obrigatorio"], trim: true },
      email: {
         type: String,
         required: [true, "O email e obrigatorio"],
         unique: true,
         lowercase: true,
         trim: true,
         match: [/^\S+@\S+\.\S+$/, "Email invalido"],
      },
      // select: false para a senha nunca sair da base de dados por acidente
      senha: { type: String, required: [true, "A senha e obrigatoria"], minlength: [8, "A senha precisa de pelo menos 8 caracteres"], select: false },
      papel: { type: String, enum: ["admin"], default: "admin" },
   },
   { timestamps: true, versionKey: false }
);

utilizadorSchema.pre("save", async function (proximo) {
   if (!this.isModified("senha")) return proximo();
   this.senha = await bcrypt.hash(this.senha, 12);
   proximo();
});

utilizadorSchema.methods.compararSenha = function (senhaEmTexto) {
   return bcrypt.compare(senhaEmTexto, this.senha);
};

export default mongoose.model("Utilizador", utilizadorSchema);
